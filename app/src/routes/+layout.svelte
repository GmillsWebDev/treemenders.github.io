<script>
    import '../styles/app.css';
    import Nav from "../components/Nav.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<!-- Nav -->
<Nav />

<!-- Body -->
 <slot/>

<!-- footer -->
 <Footer />