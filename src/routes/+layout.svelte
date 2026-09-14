<script lang="ts">
	import "./layout.css";
	import { onMount } from "svelte";
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import Navbar from "$components/navbar.svelte";
	import ScrollToTop from "$components/repetitive/scroll-to-top.svelte";
	import CustomCursor from "$components/repetitive/custom-cursor.svelte";
	import PageTransition from "$components/repetitive/page-transition.svelte";
	import FineGrain from "$components/repetitive/fine-grain.svelte";
	import { initLenis, destroyLenis } from "$lib/lenis";

	inject({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	// The shell lives here rather than in each route so that navigating does not
	// remount it: the navbar keeps its scrolled state, the custom cursor stays
	// where the pointer left it, and Lenis stays a single instance driving a
	// single rAF loop.
	onMount(() => {
		initLenis();
		return destroyLenis;
	});
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

<Navbar />

{@render children()}

<ScrollToTop />
<CustomCursor />
<PageTransition />
<FineGrain />
