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
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:image:alt" content={title} />
  <meta property="og:image:width" content="1906" />
  <meta property="og:image:height" content="908" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={title} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@DagmawiNapoleon" />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Indexing / Crawlers -->
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <link rel="canonical" href="https://dagmawi.et/" />

  <!-- Site links -->
  <link
    rel="sitemap"
    type="application/xml"
    title="Sitemap"
    href="https://dagmawi.et/sitemap.xml"
  />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#ff6900" />
  <meta name="mobile-web-app-capable" content="yes" />

  <!-- Google Analytics -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-2TPHF7027V"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-2TPHF7027V", {
      anonymize_ip: true,
    });
  </script>

  <!-- Structured data (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://dagmawi.et/#person",
          "name": "Dagmawi Napoleon",
          "url": "https://dagmawi.et/",
          "image": "https://dagmawi.et/Logo.svg",
          "jobTitle": "Software Engineer",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "ET"
          },
          "sameAs": [
            "https://github.com/dagin34",
            "https://www.linkedin.com/in/dagin34"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://dagmawi.et/#website",
          "url": "https://dagmawi.et/",
          "name": "Dagmawi Napoleon | Software Engineer (Ethiopia)",
          "publisher": {
            "@id": "https://dagmawi.et/#person"
          }
        }
      ]
    }
  </script>
</svelte:head>
