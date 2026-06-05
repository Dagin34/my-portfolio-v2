<script lang="ts">
    import { onMount } from "svelte";
    import type Lenis from "lenis";
    import Navbar from "$components/navbar.svelte";
    import Landing from "$components/landing.svelte";
    import VerticalLines from "$components/repetitive/vertical-lines.svelte";
    import Projects from "$components/projects.svelte";
    import Experience from "$components/experience.svelte";
    import Languages from "$components/languages.svelte";
    import Contact from "$components/contact.svelte";
    import Footer from "$components/footer.svelte";
    import ScrollToTop from "$components/repetitive/scroll-to-top.svelte";
    import Toast from "$components/repetitive/toast.svelte";
    import SEO from "$components/repetitive/SEO.svelte";
    import CustomCursor from "$components/repetitive/custom-cursor.svelte";
    import Offerings from "$components/offerings.svelte";
    import ScrollTwirly from "$components/repetitive/scroll-twirly.svelte";
    import Loader from "$components/repetitive/loader.svelte"; 
    import { handleLenisInit } from "$lib/lenis";

    // Reference to the Lenis instance for cleanup
    let lenisInstance: Lenis | null = null;
    onMount(() => {
        handleLenisInit(lenisInstance);
    });

    // Toast State (Svelte 5 Runes)
    let toastMessage = $state("");
    let showToast = $state(false);
    function triggerToast(msg: string): void {
        toastMessage = msg;
        showToast = true;
        setTimeout(() => (showToast = false), 3000);
    }

    // Page Load State
    let isPageReady = $state(false);
    function handleLoaderComplete(): void {
        isPageReady = true;
    }
</script>

<svelte:head>
    <SEO title="Dagmawi Napoleon Bogale | Software Engineer (Ethiopia)" />
</svelte:head>

<!-- Mounts the loader and triggers display on completion -->
<Loader onComplete={handleLoaderComplete} />

<div
    class="bg-background text-white selection:bg-brand-primary selection:text-white"
    class:opacity-0={!isPageReady}
    class:transition-opacity={isPageReady}
    class:duration-700={isPageReady}
>
    <Navbar />
    <Toast message={toastMessage} visible={showToast} />

    <main
        class="relative mx-auto w-full md:w-4/5 min-h-screen border-x border-border-color bg-background overflow-visible"
    >
        <VerticalLines position={"left"} />
        <VerticalLines position={"right"} />

        <div class="px-4 md:px-12">
            <div class="relative w-full overflow-visible">
                <div id="home"><Landing /></div>
                
                <ScrollTwirly color="#ff6900" girth={81} />
                
                <div id="experience" class="relative z-10"><Experience /></div>
                <div id="projects" class="relative z-10">
                    <Projects
                        onMissing={triggerToast}
                        fromHomePage={true}
                        limit={10}
                    />
                </div>
                <div id="skills" class="relative z-10"><Languages /></div>
                <div id="services" class="relative z-10"><Offerings /></div>
                <div id="contact" class="relative z-10"><Contact onMissing={triggerToast} /></div>
            </div>

            <Footer />
        </div>
    </main>
</div>

<ScrollToTop />
<CustomCursor />

<div 
    aria-hidden="true" 
    class="hidden absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none"
    style="font-family: 'devicon';"
>
    preload
</div>