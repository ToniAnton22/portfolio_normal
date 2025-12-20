<script lang="ts">
	import './layout.css';
	
	let isIntroOver = $state(false);
	let { children } = $props();
</script>

<svelte:head>
	<title>Tony's Portofolio</title>
	<meta
		name="description"
		content="A stunning cyberpunk-fantasy themed portfolio showcasing projects and skills"
	/>
</svelte:head>

{#if isIntroOver}
	<div class="bg-slate-950 h-screen"></div>
{:else}
	<div class="min-h-screen bg-slate-950 text-white">
		{@render children?.()}
	</div>
{/if}
