<script lang="ts">
	import "./layout.css";

	let { children } = $props();
</script>

<svelte:head>
	<meta name="google-site-verification" content="DQ9GnMhhKWqXE4mmG2OE5E9A4fueQqLlz8q_2eP58WA" />
	<link rel="icon" href="/icon.png" sizes="96x96" type="image/png">
  	<link rel="apple-touch-icon" href="/apple-touch-icon.png">
	<link rel="manifest" href="/site.webmanifest" />

	<meta name="author" content="Dagmawi Napoleon Bogale" />
	<meta name="keywords" content="Dagmawi Napoleon Bogale, dagmawi napoleon bogale, Dagmawi Napoleon, dagmawi napoleon, Ethiopian Developer, ethiopian developer, Ethiopia, Ethiopian Software Engineer, ethiopian software engineer, Developer, developer" />
	<meta name="theme-color" content="#ff6900" />
</svelte:head>

{@render children()}