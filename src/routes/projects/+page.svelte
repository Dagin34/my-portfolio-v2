<script lang='ts'>
    import Footer from "$components/footer.svelte";
    import Toast from "$components/repetitive/toast.svelte";
    import SEO from "$components/repetitive/SEO.svelte";
    import VerticalLines from "$components/repetitive/vertical-lines.svelte";

    import ProjectLanding from "$components/projects-page/projects-landing.svelte";
    import ContactSection from "$components/contact.svelte";
    import ProjectsSection from "$components/projects.svelte";
    import ScrollTwirly from "$components/repetitive/scroll-twirly.svelte";

    // Toast State (Svelte 5 Runes)
    let toastMessage = $state("");
    let showToast = $state(false);
    function triggerToast(msg: string) {
        toastMessage = msg;
        showToast = true;
        setTimeout(() => (showToast = false), 3000);
    }
</script>

<svelte:head>
    <SEO
        title="Dagmawi Napoleon Bogale | My Projects"
        description="Explore a collection of Dagmawi Napoleon Bogale's software development projects, showcasing diverse technologies and problem-solving skills."
    />
</svelte:head>

<div
    class="bg-background text-white selection:bg-brand-primary selection:text-white"
>
    <Toast message={toastMessage} visible={showToast} />

    <main
        class="relative mx-auto w-full md:w-4/5 min-h-screen border-x border-border-color bg-background overflow-visible"
    >
        <VerticalLines position={"left"} />
        <VerticalLines position={"right"} />

        <div class="px-4 md:px-12">
            <ProjectLanding />
            <ScrollTwirly color="#ff6900" girth={100} />
            <ProjectsSection
                onMissing={triggerToast}
                fromHomePage={false}
            />
            <ContactSection 
                onMissing={triggerToast}
            />
            <Footer />
        </div>
    </main>
</div>
