<script>
    export let title = "Dagmawi Napoleon | Software Engineer (Ethiopia)";
    export let description =
        "Welcome to my Portfolio Website, where you can find the skills and services I offer, and the projects I have worked on in the past.";
    export let image = "https://dagmawi.et/Thumbnail.png";
    export let url = "https://dagmawi.et";
</script>

<svelte:head>
    <title>{title}</title>

    <!-- Primary SEO -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@DagmawiNapoleon">
    <meta name="twitter:url" content={url} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <!-- Indexing / Crawlers -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <link rel="canonical" href="https://dagmawi.et/" />

    <!-- Site links -->
    <link rel="sitemap" type="application/xml" title="Sitemap" href="https://dagmawi.et/sitemap.xml" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#ff6900" />
    <meta name="mobile-web-app-capable" content="yes" />

    <!-- Open Graph -->
    <meta property="og:site_name" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description}  />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={title} />
    <meta property="og:image:width" content="1906" />
    <meta property="og:image:height" content="908" />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />

    <!-- Structured data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Personal",
          "name": "Dagmawi Napoleon | Software Engineer (Ethiopia)",
          "url": "https://dagmawi.et/",
          "logo": "https://dagmawi.et/Logo.svg",
          "sameAs": []
        },
        {
          "@type": "WebSite",
          "url": "https://dagmawi.et/",
          "name": "Dagmawi Napoleon | Software Engineer (Ethiopia)",
        }
      ]
    }
    </script>
</svelte:head>
