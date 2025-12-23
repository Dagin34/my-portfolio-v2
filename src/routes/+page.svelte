<script>
    import Navbar from "$components/navbar.svelte";
    import Landing from "$components/landing.svelte";
    import VerticalLines from "$components/repetitive/vertical-lines.svelte";
    import Projects from "$components/projects.svelte";
    import Experience from "$components/experience.svelte";
    import Offerings from "$components/offerings.svelte";
    import Contact from "$components/contact.svelte";
    import Footer from "$components/footer.svelte";
    import ScrollToTop from "$components/repetitive/scroll-to-top.svelte";
    import Toast from "$components/repetitive/toast.svelte";
    import SEO from "$components/repetitive/SEO.svelte";

    // Toast State (Svelte 5 Runes)
    let toastMessage = $state("");
    let showToast = $state(false);

    /**
     * @param {string} msg
     */
    function triggerToast(msg) {
        toastMessage = msg;
        showToast = true;
        setTimeout(() => (showToast = false), 3000);
    }
</script>

<svelte:head>
    <SEO
        title="Dagmawi Napoleon | Software Engineer (Ethiopia)"
        description="Welcome to my Portfolio Website, where you can find the skills and services I offer, and the projects I have worked on in the past."
    />
</svelte:head>

<div
    class="bg-background text-white selection:bg-brand-primary selection:text-white"
>
    <Navbar />
    <Toast message={toastMessage} visible={showToast} />

    <main
        class="relative mx-auto w-4/5 min-h-screen border-x border-border-color bg-background overflow-visible"
    >
        <VerticalLines position={"left"} />
        <VerticalLines position={"right"} />

        <div class="px-4 md:px-12">
            <div id="home"><Landing /></div>
            <div id="projects"><Projects onMissing={triggerToast} /></div>
            <div id="experience"><Experience /></div>
            <div id="skills"><Offerings /></div>
            <div id="contact"><Contact /></div>
            <Footer />
        </div>
    </main>
</div>
<ScrollToTop />

<style>
    :global(html) {
        scroll-behavior: smooth;
    }
</style>
