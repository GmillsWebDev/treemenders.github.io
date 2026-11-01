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

### 1. cPanel: staging subdomain

1. **Domains → Create A New Domain**: `staging.treemendersarb.co.uk`. Untick "Share document root" and set the document root **outside `public_html`**, e.g. `/home/<cpanel-user>/staging.treemendersarb.co.uk`.
   (Inside `public_html` it would inherit production's `.htaccess` rules, and could be wiped by a production deploy.)
2. **SSL/TLS Status → Run AutoSSL** and check the subdomain gets a certificate.

### 2. cPanel: staging password

1. **Directory Privacy** → open the staging folder → tick "Password protect this directory", name it `Treemenders staging`, save, then create a user (this is what you'll give the client to view staging).
2. cPanel writes a `.htaccess` into the folder containing a line like
   `AuthUserFile "/home/<cpanel-user>/.htpasswds/staging.treemendersarb.co.uk/passwd"`.
   Copy that path (open the file in File Manager, with "Show hidden files" on). You'll need it in step 4. The deploy replaces that `.htaccess` with `deploy/staging/.htaccess`, but the password file it points to stays put.

### 3. cPanel: FTP accounts (one per site, each locked to its folder)

**FTP Accounts → Add FTP Account**, twice:

| Account | Directory |
| --- | --- |
| `deploy-prod@treemendersarb.co.uk` | `public_html` |
| `deploy-staging@treemendersarb.co.uk` | the staging document root from step 1 |

Use long generated passwords. The FTP hostname is the website domain, `treemendersarb.co.uk` ([Eco's FTP guide](https://help.ecowebhosting.co.uk/file-database-management/connecting-to-your-hosting-account-via-ftp)).

FTPS checks the server's certificate matches that hostname. If the first deploy fails with a certificate/TLS error, the FTP port is presenting the shared server's certificate instead. Find the name it's issued for and use that as `FTP_SERVER`:

```bash
openssl s_client -connect treemendersarb.co.uk:21 -starttls ftp </dev/null 2>/dev/null | openssl x509 -noout -subject -ext subjectAltName
```

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
   If staging returns **500**, the server doesn't accept the `<RequireAny>` block in `deploy/staging/.htaccess`: replace that block with a plain `Require valid-user` (AutoSSL renewals on staging may then fail; re-run AutoSSL manually if the certificate lapses).
2. Merge to `main`. The first production deploy uploads every file (there's no state file yet); later ones only upload changes.
3. Run through the go-live checks in `PROJECTLOG.md`.

### If the upload fails

- **Certificate / TLS error**: `FTP_SERVER` doesn't match the certificate. Use the name the certificate is issued for (`openssl` command in step 3). As a last resort set `security: loose` in the workflow (still encrypted, but the certificate isn't checked).
- **Login failed**: check the username includes `@treemendersarb.co.uk`.
- **Timeouts**: some hosts block GitHub's IP ranges or limit connections; ask Eco Web Hosting support. If the plan has SSH access, the upload step can be switched to rsync over SSH instead.
