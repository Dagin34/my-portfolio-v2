<script lang="ts">
	import "./layout.css";
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<meta name="google-site-verification" content="DQ9GnMhhKWqXE4mmG2OE5E9A4fueQqLlz8q_2eP58WA" />

	<link rel="apple-touch-icon" href="/icon.png">
	<link rel="manifest" href="/site.webmanifest" />

	<meta name="author" content="Dagmawi Napoleon Bogale" />
	<meta name="keywords" content="Dagmawi Napoleon Bogale, dagmawi napoleon bogale, Dagmawi Napoleon, dagmawi napoleon, Ethiopian Developer, ethiopian developer, Ethiopia, Ethiopian Software Engineer, ethiopian software engineer, Developer, developer" />
	<meta name="theme-color" content="#ff6900" />

    <link rel="preload" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" as="style" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

    <!-- 2. Preload the actual font file (crucial to eliminate the delay) -->
    <link rel="preload" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/fonts/devicon.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

{@render children()}