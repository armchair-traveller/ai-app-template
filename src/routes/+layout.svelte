<script lang="ts">
	import '../app.css';
	import 'unfonts.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>AI App Example</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:boundary>
	{@render children?.()}
	{#snippet pending()}{/snippet}
</svelte:boundary>
