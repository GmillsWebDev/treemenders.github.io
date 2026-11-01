<script>
    //gets current year for footer
    const currentYear = new Date().getFullYear();

    import logo from '$lib/images/branding/logo_med.webp'
    import { openCookieSettings } from '$lib/consent.js';
</script>

<footer>
<div class="container">
    <div class="footerContent">
        <div class="logo">
            <img src={logo} alt="Treemenders Arboriculture logo">
            <div class="socials">
            <a href="https://www.facebook.com/people/Treemenders-Arboriculture/61575724665977/" target="_blank" rel="noopener" aria-label="facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/treemenders_arboriculture" target="_blank" rel="noopener" aria-label="instagram"><i class="fa-brands fa-instagram"></i></a>
        </div>
        </div>
        <div>
            <p class="about">Treemenders provides expert tree surgery, garden maintenance, and landscaping support across Chichester and West Sussex, and into East Sussex and Hampshire. From <a href="/services/crown-reduction/">crown reduction</a> and <a href="/services/hedge-trimming-shaping/">hedge trimming</a> to <a href="/services/stump-grinding-removal/">stump removal</a> and <a href="/services/fencing/">fencing</a>, we help homeowners create safer, greener, and more beautiful outdoor spaces. With a friendly team, professional equipment and a passion for nature, we’re proud to offer reliable, customer-focused service you can trust, season after season.</p>
            <nav class="legal" aria-label="Legal">
                <a href="/privacy-policy/">Privacy policy</a>
                <a href="/cookie-policy/">Cookie policy</a>
                <button type="button" on:click={openCookieSettings}>Cookie settings</button>
            </nav>
            <p class="copy">&copy; {currentYear} Treemenders Arboriculture. All rights reserved.</p>
        </div>
    </div>
    

</div>
</footer>

<style>
    footer{
        background: var(--colour-light-grey);
        color: var(--colour-black);
        padding: 2rem 0;
        a{
            color: var(--colour-black);
            text-decoration: none;
            transition: color 0.3s ease;
            &:hover {
                color: var(--colour-secondary);
            }
            &:visited {
                color: var(--colour-black);
            }
        }

        .container{
            margin:0 2rem;
        }

        .footerContent {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: 1rem;
            position: relative;
        }

        .logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            
            img{
                width: 6rem;
                height: auto;
                }
        }

            .socials {
                display: flex;
                gap: 1rem;
                a{
                    font-size: 1.5rem;
                }
            }
            .about a {
                text-decoration: underline;
            }
            .legal {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
                gap: 0.5rem 1.5rem;
                margin-top: 1rem;
                font-size: 0.9rem;
                a, button {
                    color: var(--colour-black);
                    text-decoration: underline;
                }
                button {
                    font: inherit;
                    background: none;
                    border: 0;
                    padding: 0;
                    cursor: pointer;
                    &:hover {
                        color: var(--colour-secondary);
                    }
                }
            }
            .copy {
                text-align: right;
                margin-top: 1rem;
                position: relative;
                bottom: 0;
                right: 0;
                font-size: 0.8rem;
            }
        }
        @media screen and (max-width: 768px) {
            footer {
                .footerContent {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
                .logo {
                    align-items: center;
                }

                .copy{
                    position: relative;
                }

                .legal {
                    justify-content: center;
                }

            }
        }
    </style>