<script>
    import LegalPage from '../../components/LegalPage.svelte';
    import { openCookieSettings } from '$lib/consent.js';
    import { business } from '$lib/site.js';
</script>

<LegalPage
    title="Cookie Policy"
    description="How the Treemenders website uses cookies, what each one does, and how to change your cookie choices."
    heroText="What we use, why, and how to change your mind."
    updated="1 November 2026"
>
    <p>
        This page explains how the {business.legalName} website (<strong>treemendersarb.co.uk</strong>)
        uses cookies and similar technologies. For how we handle personal information more generally,
        see our <a href="/privacy-policy/">privacy policy</a>.
    </p>

    <h2>What are cookies?</h2>
    <p>
        Cookies are small text files a website stores on your device. Some are essential for a site to
        work; others help the site owner understand how the site is used, or come from services
        embedded in the page, such as maps.
    </p>

    <h2>Your choices</h2>
    <p>
        When you first visit, we ask whether you're happy for us to use optional cookies.
        <strong>Nothing optional is set unless you say yes</strong>, and the site works fully either way.
        Your choice is remembered for six months, after which we'll ask again.
    </p>
    <p>
        You can change or withdraw your consent at any time. If you withdraw it, we delete the relevant
        cookies and stop the related services.
    </p>
    <p><button type="button" class="settingsBtn" on:click={openCookieSettings}>Change my cookie settings</button></p>
    <p>
        You can also block or delete cookies in your browser settings. Blocking all cookies may stop
        some parts of some websites from working.
    </p>

    <h2>Cookies we use</h2>

    <h3>Strictly necessary</h3>
    <p>These don't need your consent because they're needed to remember the choice you've made.</p>
    <table>
        <thead><tr><th>Name</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
            <tr>
                <td data-label="Name"><code>cookieConsent</code> (stored in your browser's local storage)</td>
                <td data-label="Purpose">Remembers your cookie choices so we don't ask on every page.</td>
                <td data-label="Duration">6 months</td>
            </tr>
        </tbody>
    </table>

    <h3>Analytics (optional)</h3>
    <p>
        Google Analytics tells us how many people visit, which pages they view and roughly where they
        come from, so we can improve the site. Google Analytics doesn't store full IP addresses, and we
        don't use it for advertising.
    </p>
    <table>
        <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
            <tr>
                <td data-label="Name"><code>_ga</code></td>
                <td data-label="Provider">Google</td>
                <td data-label="Purpose">Distinguishes one visitor from another.</td>
                <td data-label="Duration">2 years</td>
            </tr>
            <tr>
                <td data-label="Name"><code>_ga_9HS1XD1SHH</code></td>
                <td data-label="Provider">Google</td>
                <td data-label="Purpose">Keeps track of your current visit (session).</td>
                <td data-label="Duration">2 years</td>
            </tr>
        </tbody>
    </table>

    <h3>Site improvement (optional)</h3>
    <p>
        Contentsquare shows us how visitors use the site, for example where people click and how far
        they scroll, including anonymised session recordings. Text you type into the site is not
        recorded. We use this only to find and fix problems with the site.
    </p>
    <table>
        <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
            <tr>
                <td data-label="Name"><code>_hjSessionUser_6513386</code></td>
                <td data-label="Provider">Contentsquare</td>
                <td data-label="Purpose">Recognises a returning visitor so their visits can be grouped together.</td>
                <td data-label="Duration">1 year</td>
            </tr>
            <tr>
                <td data-label="Name"><code>_hjSession_6513386</code></td>
                <td data-label="Provider">Contentsquare</td>
                <td data-label="Purpose">Links the pages viewed during a single visit.</td>
                <td data-label="Duration">30 minutes</td>
            </tr>
            <tr>
                <td data-label="Name">Other <code>_hj…</code> / <code>_cs…</code> cookies</td>
                <td data-label="Provider">Contentsquare</td>
                <td data-label="Purpose">Short-lived technical cookies used by the same service.</td>
                <td data-label="Duration">Up to 1 year</td>
            </tr>
        </tbody>
    </table>

    <h3>Maps (optional)</h3>
    <p>
        The map of the areas we cover on our <a href="/contact/">contact page</a> is provided by Google
        Maps. Google sets its own cookies when the map loads, so we only load it once you've allowed it.
        You can also open the map directly on Google Maps instead.
    </p>
    <table>
        <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
            <tr>
                <td data-label="Name">e.g. <code>NID</code>, <code>AEC</code>, <code>SOCS</code></td>
                <td data-label="Provider">Google</td>
                <td data-label="Purpose">Set by Google Maps for its own security, preferences and service.</td>
                <td data-label="Duration">Up to 13 months</td>
            </tr>
        </tbody>
    </table>
    <p>
        See <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">how Google uses cookies</a>.
    </p>

    <h3>Icons</h3>
    <p>
        The icons on this site are loaded from Font Awesome. This doesn't set cookies, but like any
        web request it shares your IP address with Font Awesome so the icons can be delivered.
    </p>

    <h2>Contact</h2>
    <p>
        Questions about cookies? Email us at <a href="mailto:{business.email}">{business.email}</a>.
    </p>
</LegalPage>

<style>
    .settingsBtn {
        font: inherit;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        border: 1px solid var(--colour-primary);
        background: var(--colour-primary);
        color: var(--colour-white);
        cursor: pointer;
        transition: background-color 0.3s ease;
        &:hover {
            background: var(--colour-secondary);
            border-color: var(--colour-secondary);
        }
    }
</style>
