<script lang="ts">
	import "./layout.css";

	let { children } = $props();
</script>

<svelte:head>
	<meta name="google-site-verification" content="DQ9GnMhhKWqXE4mmG2OE5E9A4fueQqLlz8q_2eP58WA" />

	<link rel="icon" href="/favicon.ico" />
	<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">

	<link rel="apple-touch-icon" href="/icon.png">
	<link rel="manifest" href="/site.webmanifest" />

	<meta name="author" content="Dagmawi Napoleon Bogale" />
	<meta name="keywords" content="Dagmawi Napoleon Bogale, dagmawi napoleon bogale, Dagmawi Napoleon, dagmawi napoleon, Ethiopian Developer, ethiopian developer, Ethiopia, Ethiopian Software Engineer, ethiopian software engineer, Developer, developer" />
	<meta name="theme-color" content="#ff6900" />
</svelte:head>

{@render children()}