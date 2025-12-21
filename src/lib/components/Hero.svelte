<script lang="ts">
	import { mouseParallax, scaleWords } from '$lib/uitls/mouseParallax';
	import { onMount } from 'svelte';

	let jobText = $state('Full Stack Developer');
	let displayJobText = $state('');
	let name = $state('Cristian Anton Frincu');

	onMount(() => {
		let i = 0;
		const interval = setInterval(() => {
			displayJobText = jobText.slice(0, i);
			i++;
			if (i > jobText.length) clearInterval(interval);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-volcanic-obsidian"
>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">

		<div
			class="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
			style="background: radial-gradient(circle, rgba(193, 68, 14, 0.3) 0%, transparent 70%);"
		></div>


		<h1 use:scaleWords={{ speed: 0.1 }} class="relative mb-6 text-6xl font-bold md:text-8xl transition-all duration-200 delay-75">
		
			<span class="text-gradient-volcanic">
				{name}
			</span>
		</h1>

	
		<div
			class="fade-in-up mb-8 font-mono text-2xl text-earth-light md:text-4xl"
			style="animation-delay: 0.2s;"
		>
			<span class="text-lava">{'>'}</span>
			{displayJobText}
			<span class="animate-pulse">_</span>
		</div>

		<p
			class="fade-in-up mx-auto mb-12 max-w-3xl text-xl text-ash md:text-2xl"
			style="animation-delay: 0.4s;"
		>
			Crafting powerful web applications with modern technologies and clean code
		</p>

		<div class="fade-in-up flex flex-wrap justify-center gap-6" style="animation-delay: 0.6s;">
			<a href="#projects" class="btn-lava"> View My Work </a>

			<a href="#contact" class="btn-earth-outline"> Get In Touch </a>
		</div>

		<div  class="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center">
			<span class="mb-2 text-sm text-earth-light">Scroll Down</span>
			<div class="flex h-10 w-6 justify-center rounded-full border-2 border-earth">
				<div class="mt-2 h-3 w-1 animate-bounce rounded-full bg-earth"></div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0) translateX(0);
		}
		33% {
			transform: translateY(-20px) translateX(10px);
		}
		66% {
			transform: translateY(10px) translateX(-10px);
		}
	}

	.fade-in-up {
		animation: fadeInUp 0.8s ease-out forwards;
		opacity: 0;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
