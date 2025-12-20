<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatBubble from '$lib/components/ChatBubble.svelte';
	
	let isHidden = $state(false)
</script>

<Navigation />

<main id="home" class="overflow-x-hidden">
	<Hero />

	<About />

	<Projects />

	<Skills />

	<Contact />
	<ChatBubble bind:isHidden/>
</main>

<Footer />
