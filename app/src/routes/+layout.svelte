<script>
    import '../styles/app.css';
    import Nav from "../components/Nav.svelte";
    import Footer from "../components/Footer.svelte";

    // ContentSquare integration
    // import { injectContentsquareScript } from '@contentsquare/tag-sdk';

    // injectContentsquareScript({
    // siteId: "6491456",
    // async: true, // Optional: Set to false to wait for script execution until after document parsing.
    // defer: false // Optional: Set to true to defer script execution after document parsing.
    // });
</script>

<!-- Nav -->
<Nav />

<!-- Body -->
 <main>
    <slot/>
 </main>

<!-- footer -->
 <Footer />