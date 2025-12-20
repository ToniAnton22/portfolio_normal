<script lang="ts">
	import { mouseParallax } from '$lib/uitls/mouseParallax';
	import { onMount } from 'svelte';
	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'Home', href: '#home' },
		{ label: 'About', href: '#about' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Contact', href: '#contact' }
	];

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > 50;
		});
	}
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {isScrolled
		? 'bg-volcanic-charcoal/95 shadow-volcanic backdrop-blur-md border-b border-volcanic-basalt'
		: 'bg-transparent'}"
>
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex h-20 items-center justify-between">
			<a href="#home" class="group flex items-center space-x-2">
				<div
					
					class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-lava transition-all duration-300 group-hover:rotate-180 group-hover:border-earth"
				>
					<span class="text-xl font-bold text-lava group-hover:text-earth">{'<>'}</span>
				</div>
				<span class="text-gradient-lava text-2xl font-bold"> Portfolio </span>
			</a>

			<div class="hidden items-center space-x-1 md:flex">
				{#each navItems as item}
					<a
						href={item.href}
						class="group relative px-4 py-2 font-medium text-ash transition-all duration-300 hover:text-lava"
					>
						<span class="relative z-10">{item.label}</span>
						<div
							class="absolute inset-0 scale-0 rounded-lg bg-lava/10 transition-transform duration-300 group-hover:scale-100"
						></div>
						<div
							class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full"
							style="background: var(--gradient-lava);"
						></div>
					</a>
				{/each}

				<a href="#contact" class="btn-lava ml-4"> Hire Me </a>
			</div>

			<button
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="group flex h-10 w-10 flex-col items-center justify-center space-y-1.5 md:hidden"
				aria-label="Toggle menu"
			>
				<span
					class="h-0.5 w-6 bg-lava transition-all duration-300 {isMobileMenuOpen
						? 'translate-y-2 rotate-45'
						: ''}"
				></span>
				<span
					class="h-0.5 w-6 bg-lava transition-all duration-300 {isMobileMenuOpen
						? 'opacity-0'
						: ''}"
				></span>
				<span
					class="h-0.5 w-6 bg-lava transition-all duration-300 {isMobileMenuOpen
						? '-translate-y-2 -rotate-45'
						: ''}"
				></span>
			</button>
		</div>
	</div>

	<div
		class="overflow-hidden transition-all duration-300 md:hidden {isMobileMenuOpen
			? 'max-h-screen'
			: 'max-h-0'}"
	>
		<div class="border-t border-volcanic-basalt bg-volcanic-charcoal/95 px-6 py-4 backdrop-blur-md">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={() => (isMobileMenuOpen = false)}
					class="block border-b border-volcanic-basalt py-3 font-medium text-ash transition-colors duration-300 last:border-0 hover:text-lava"
				>
					<span class="text-earth">{'>'}</span>
					{item.label}
				</a>
			{/each}
			<a
				href="#contact"
				onclick={() => (isMobileMenuOpen = false)}
				class="btn-lava mt-4 block text-center"
			>
				Hire Me
			</a>
		</div>
	</div>
</nav>
