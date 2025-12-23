<script>
    export let title = "Dagmawi Napoleon | Software Engineer (Ethiopia)";
    export let description =
        "Welcome to my Portfolio Website, where you can find the skills and services I offer, and the projects I have worked on in the past.";
    export let image = "https://dagmawinapoleon.vercel.app/Thumbnail.png";
    export let url = "https://dagmawinapoleon.vercel.app";
</script>

<svelte:head>
    <title>{title}</title>

    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
