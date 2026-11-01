# Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds the site and uploads `app/build/` to Eco Web Hosting over FTPS.

| Trigger | What happens |
| --- | --- |
| Push / merged PR to `release/**` (e.g. `release/1.2`) | Build, then deploy to **staging** (`https://staging.treemendersarb.co.uk`) |
| Push / merged PR to `main` | Build, then deploy to **production** (`https://treemendersarb.co.uk`) |
| Pull request into `main` or `release/**` | Build and `svelte-check` only (no deploy) |
| Actions tab → "Build and deploy" → Run workflow | Manual run on any branch (deploys only from `main` / `release/**`) |

Each deploy only uploads changed files and removes files deleted from the build. It keeps a record of what's on the server in `.ftp-deploy-sync-state.json` in the site root, which `.htaccess` blocks from public view. **Don't delete that file**; if it goes missing, the next deploy simply re-uploads everything.

After uploading, the workflow runs a smoke test: production must return 200 for the home page, a service page and the sitemap, and 404 for a made-up URL; staging must return 401 (up, and password-protected).

**Rolling back:** revert the bad commit on `main` (or `release/...`) and push; the previous version redeploys in a couple of minutes.

---

## One-off setup

Eco Web Hosting uses **DirectAdmin** (not cPanel). Each domain lives in its own folder:

```
/home/<user>/domains/
  treemendersarb.co.uk/public_html           <- production document root
  staging.treemendersarb.co.uk/public_html   <- staging document root
```

`<user>` is your DirectAdmin username (shown at the top of DirectAdmin and in File Manager paths).

### 1. DirectAdmin: staging domain

1. Add `staging.treemendersarb.co.uk` as its own domain (or subdomain with its own folder), so it gets `domains/staging.treemendersarb.co.uk/public_html`. Staging stays separate from production's files and `.htaccess`.
2. **Domain Setup → staging.treemendersarb.co.uk → Private HTML → "Use a symbolic link from private_html to public_html".** DirectAdmin serves HTTPS from `private_html`; without the link, `https://staging…` shows an empty folder (403) even after a successful deploy. (Production already has this link.)
3. **SSL Certificates** for the staging domain: issue a free Let's Encrypt certificate if it doesn't already have one.

### 2. DirectAdmin: staging password

1. **Password Protected Directories** → protect `domains/staging.treemendersarb.co.uk/public_html` with a prompt like `Treemenders staging`, and add a user (this is what you'll give the client to view staging).
2. DirectAdmin keeps the password file at
   `/home/<user>/domains/staging.treemendersarb.co.uk/.htpasswd/public_html/.htpasswd`
   and writes an `AuthUserFile` line with that path into `staging…/public_html/.htaccess`. Open that `.htaccess` in File Manager (hidden files on) and copy the path exactly. You'll need it in step 4. The deploy replaces that `.htaccess` with `deploy/staging/.htaccess`, but the password file it points to stays put.

### 3. DirectAdmin: FTP accounts (one per site, each locked to its folder)

**FTP Management → Create FTP account**, once per domain, choosing a **custom** directory set to the `public_html` folder. The "Domain" option starts in `domains/<domain>/`, one level above the site, and the deploy would upload to the wrong place.

| Account | Directory |
| --- | --- |
| `deploy-prod@treemendersarb.co.uk` | `/home/<user>/domains/treemendersarb.co.uk/public_html` |
| `deploy-staging@staging.treemendersarb.co.uk` | `/home/<user>/domains/staging.treemendersarb.co.uk/public_html` |

Use long generated passwords. Use the full FTP username DirectAdmin shows (including the `@domain` part) in `FTP_USERNAME`. The FTP hostname is the website domain, `treemendersarb.co.uk` ([Eco's FTP guide](https://help.ecowebhosting.co.uk/file-database-management/connecting-to-your-hosting-account-via-ftp)).

**Certificate checking is off (`security: loose` in the workflow).** Checked 1 Nov 2026: the FTP port presents a certificate for `oceanus.hostns.io` (the shared server), sends no intermediate, and chains to Let's Encrypt's new "ISRG Root YE", which isn't in standard trust stores yet. Strict mode failed with `unable to verify the first certificate`. The connection is still TLS-encrypted; what's lost is proof the server is Eco's. To re-check:

```bash
openssl s_client -connect oceanus.hostns.io:21 -starttls ftp -showcerts </dev/null 2>/dev/null | grep -E "s:|i:|Verify return code"
```

If it ever reports `Verify return code: 0 (ok)`, set `FTP_SERVER` to `oceanus.hostns.io` and switch the workflow back to `security: strict`. Better still, if the plan includes SSH, switch the upload to SFTP with a pinned host key.

### 4. GitHub: environments, secrets and variables

Repo → **Settings → Environments** → create `staging` and `production`.

For **each** environment, add:

| Type | Name | staging | production |
| --- | --- | --- | --- |
| Secret | `FTP_SERVER` | server hostname | server hostname |
| Secret | `FTP_USERNAME` | `deploy-staging@…` | `deploy-prod@…` |
| Secret | `FTP_PASSWORD` | its password | its password |
| Variable | `SITE_URL` | `https://staging.treemendersarb.co.uk` | `https://treemendersarb.co.uk` |
| Variable | `STAGING_AUTH_USER_FILE` | path from step 2 | (not needed) |

Recommended on **production**:
- **Deployment branches**: "Selected branches" → `main` only.
- **Required reviewers**: add yourself if you want to approve each live deploy (the run waits in the Actions tab until you click "Approve").

On **staging**: Deployment branches → `release/*`.

### 5. Branch protection (optional, recommended)

Settings → Branches → add a rule for `main`: require a pull request and the "Build" check to pass before merging.

### 6. First runs

1. Push a `release/test` branch. Check the Actions tab, then visit staging: you should get a password prompt, and `curl -I https://staging.treemendersarb.co.uk/robots.txt` (with credentials) should show `X-Robots-Tag: noindex`.
   If staging returns **500**, the server doesn't accept the `<RequireAny>` block in `deploy/staging/.htaccess`: replace that block with a plain `Require valid-user` (Let's Encrypt renewals on staging may then fail; reissue the certificate in DirectAdmin if it lapses).
2. Merge to `main`. The first production deploy uploads every file (there's no state file yet); later ones only upload changes.
3. Run through the go-live checks in `PROJECTLOG.md`.

### If the upload fails

- **Certificate / TLS error**: see the note in step 3 (Eco's FTP certificate chain can't be verified, so the workflow uses `security: loose`).
- **Login failed**: check the username includes `@treemendersarb.co.uk`.
- **Timeouts**: some hosts block GitHub's IP ranges or limit connections; ask Eco Web Hosting support. If the plan has SSH access, the upload step can be switched to rsync over SSH instead.
