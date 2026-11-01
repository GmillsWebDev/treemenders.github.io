<script>
    import LegalPage from '../../components/LegalPage.svelte';
    import { business } from '$lib/site.js';
</script>

<LegalPage
    title="Privacy Policy"
    description="How Treemenders Arboriculture collects, uses and protects your personal information, and your rights under UK data protection law."
    heroText="How we look after your personal information."
    updated="1 November 2026"
>
    <p>
        This policy explains what personal information {business.legalName} collects, why, how long we
        keep it, and your rights. We keep it as simple as we can: we only collect what we need to quote
        for and carry out work, and we never sell your information.
    </p>

    <h2>Who we are</h2>
    <p>
        {business.legalName} is the trading name of {business.owner}, a sole trader based in
        {business.locality}, {business.region}. {business.owner} is the <strong>data controller</strong>
        for the personal information described here, which means they decide how it's used and are
        responsible for protecting it.
    </p>
    <p>
        For anything to do with your personal information, including the requests described under
        "Your rights" below, email <a href="mailto:{business.email}">{business.email}</a>.
    </p>

    <h2>What we collect</h2>
    <h3>When you get in touch or ask for a quote</h3>
    <p>
        Your name, phone number, email address, the address where the work is needed, details of the
        job, and any photos you send us. This comes from you by phone, text message or email.
    </p>
    <h3>When we carry out work for you</h3>
    <p>
        The details above, plus quotes, invoices and payment records. We don't store card details.
    </p>
    <h3>Photos of our work</h3>
    <p>
        We may photograph trees, gardens and boundaries before and after a job. See
        <a href="#photos">Photos of our work</a> below.
    </p>
    <h3>When you use this website</h3>
    <ul>
        <li>
            <strong>Only if you agree:</strong> analytics information about how you use the site (pages
            visited, device and browser type, approximate location) through Google Analytics and
            Contentsquare. See our <a href="/cookie-policy/">cookie policy</a>.
        </li>
        <li>
            <strong>Always:</strong> our web host's servers automatically keep basic technical logs (such
            as IP address, browser type and pages requested) to keep the site running and secure.
        </li>
    </ul>
    <p>The website has no contact form or user accounts, so we don't collect anything else through it.</p>

    <h2>How we use it, and our lawful basis</h2>
    <p>UK data protection law requires us to have a valid reason ("lawful basis") for each use:</p>
    <table>
        <thead><tr><th>What we do</th><th>Lawful basis</th></tr></thead>
        <tbody>
            <tr>
                <td data-label="What we do">Reply to your enquiry, visit the site and give you a quote</td>
                <td data-label="Lawful basis">Steps you've asked us to take before entering a contract</td>
            </tr>
            <tr>
                <td data-label="What we do">Carry out the work, arrange visits and keep you updated</td>
                <td data-label="Lawful basis">Performing our contract with you</td>
            </tr>
            <tr>
                <td data-label="What we do">Invoices, payment and tax records</td>
                <td data-label="Lawful basis">Legal obligation (HMRC record-keeping)</td>
            </tr>
            <tr>
                <td data-label="What we do">Photos of completed work for our gallery and social media</td>
                <td data-label="Lawful basis">Legitimate interests (showing the quality of our work), with your agreement first</td>
            </tr>
            <tr>
                <td data-label="What we do">Website analytics</td>
                <td data-label="Lawful basis">Your consent, which you can withdraw at any time</td>
            </tr>
            <tr>
                <td data-label="What we do">Web server logs</td>
                <td data-label="Lawful basis">Legitimate interests (keeping the website secure and working)</td>
            </tr>
        </tbody>
    </table>
    <p>We don't use your information for automated decision-making or profiling, and we don't send marketing.</p>

    <h2 id="photos">Photos of our work</h2>
    <p>
        We sometimes use photos of completed jobs in the gallery on this website and on our social media
        pages. We'll always ask before we publish photos of your property, and we avoid showing details
        that could identify you or your home, such as house numbers, number plates or people.
    </p>
    <p>
        If you'd like a photo of your property removed, email us and we'll take it down from our website
        and social media pages as soon as possible.
    </p>

    <h2>Who we share it with</h2>
    <p>We only share your information where we need to, with:</p>
    <ul>
        <li><strong>Google</strong>: email (Gmail), and, with your consent, Google Analytics and Google Maps.</li>
        <li><strong>Contentsquare</strong>: website insights, with your consent.</li>
        <li><strong>Eco Web Hosting</strong>: hosts this website and its server logs.</li>
        <li><strong>Font Awesome</strong>: delivers the icons on this site (receives your IP address).</li>
        <li><strong>Social media platforms</strong> (Facebook and Instagram): when we post photos of our work.</li>
        <li><strong>Our accountant and HMRC</strong>: for tax and financial records.</li>
    </ul>
    <p>
        These providers only process information for the purposes described. We may also share
        information if the law requires it.
    </p>

    <h2>International transfers</h2>
    <p>
        Some of these providers, such as Google, may process information outside the UK, including in the
        United States. Where they do, they rely on protections recognised under UK law, such as the
        UK–US data bridge or the UK's approved contract clauses.
    </p>

    <h2>How long we keep it</h2>
    <table>
        <thead><tr><th>Information</th><th>How long</th></tr></thead>
        <tbody>
            <tr>
                <td data-label="Information">Enquiries and quotes that don't go ahead</td>
                <td data-label="How long">12 months, then deleted</td>
            </tr>
            <tr>
                <td data-label="Information">Customer, invoice and payment records</td>
                <td data-label="How long">6 years, as HMRC requires</td>
            </tr>
            <tr>
                <td data-label="Information">Photos of completed work</td>
                <td data-label="How long">Until you ask us to remove them, or we stop using them</td>
            </tr>
            <tr>
                <td data-label="Information">Website analytics</td>
                <td data-label="How long">Up to 14 months</td>
            </tr>
        </tbody>
    </table>

    <h2>Keeping it secure</h2>
    <p>
        We keep your information in password-protected accounts and devices, and only use it for the
        purposes above. This website is served over a secure (HTTPS) connection.
    </p>

    <h2>Your rights</h2>
    <p>Under UK data protection law you have the right to:</p>
    <ul>
        <li>ask for a copy of the personal information we hold about you</li>
        <li>ask us to correct anything that's wrong or incomplete</li>
        <li>ask us to delete your information</li>
        <li>ask us to restrict how we use it, or object to us using it</li>
        <li>ask for your information in a format you can pass to someone else</li>
        <li>withdraw your consent at any time, where we rely on it (for example, website analytics)</li>
    </ul>
    <p>
        To make a request, email <a href="mailto:{business.email}">{business.email}</a>. It's free, and
        we'll respond within one month. Some rights have legal limits; for example, we must keep
        invoices for HMRC even if you ask us to delete them.
    </p>

    <h2>Complaints</h2>
    <p>
        If you're unhappy with how we've handled your information, please contact us first so we can
        put it right. You can also complain to the UK's data protection regulator, the Information
        Commissioner's Office (ICO), at
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">ico.org.uk/make-a-complaint</a>
        or on 0303 123 1113.
    </p>

    <h2>Changes to this policy</h2>
    <p>
        We'll update this page if the way we use personal information changes. The date at the top
        shows when it was last updated.
    </p>
</LegalPage>
