<script lang="ts">
	import { invalidateAll } from "$app/navigation";

	let { isHidden = $bindable(true) } = $props();
	interface Project {
		id: number;
		title: string;
		description: string;
		image: string;
		tags: string[];
		demoLink?: string;
		githubLink?: string;
		featured?: boolean;
	}

	const projects: Project[] = [
		{
			id: 1,
			title: 'Plane Dilemma Wiki',
			description:
				'Interactive D&D campaign visualization platform with book-style presentation and Mapbox integration. ' +
				'Features elegant animations and read-only campaign data access through C# .NET backend integration with Supabase.',
			image: '/projects/plane.png',
			tags: [
				'SvelteKit 2',
				'Svelte 5',
				'TypeScript',
				'C# .NET',
				'Mapbox',
				'Supabase',
				'Tailwind CSS',
				'Vercel'
			],
			demoLink: 'https://www.planedilemma.bard-labs.com',
			githubLink: 'https://github.com/ToniAnton22/plane-dilemma-frontend',
			featured: true
		},
		{
			id: 2,
			title: 'GTA Installer',
			description:
				'Sophisticated Electron desktop application for automated GTA San Andreas mod installation. ' +
				'Features AI-assisted instruction generation, multi-source download support (Google Drive, ShareMods), and admin web interface for mod database management.',
			image: '/projects/installer.png',
			tags: ['Electron', 'Vite', 'SvelteKit 2', 'Svelte 5', 'TypeScript', 'OpenAI', 'Express'],
			githubLink: 'https://github.com/ToniAnton22/gta-installer-release/releases',
			featured: true
		},
		{
			id: 3,
			title: 'DonCSN - Automotive Service Platform',
			description:
				'Enterprise-grade automotive service management and e-commerce platform with appointment booking, ' +
				'real-time inventory management, secure checkout flow, and business analytics dashboard. Professional dark noir design.',
			image: '/projects/doncsn.png',
			tags: ['SvelteKit 2', 'Svelte 5', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS'],
			demoLink: 'https://don-csn.vercel.app/dashboard',
			githubLink: '#',
			featured: true
		},
		{
			id: 4,
			title: 'Plane Dilemma C# Backend & MCP Server',
			description:
				'Robust microservices backend serving Dave and Wiki with dual API architecture, EventSource real-time updates, ' +
				'JWT authentication, role-based access control, recording coordination, and integrated MCP server enabling Claude AI database interaction.',
			image: '/projects/locked.webp',
			tags: ['C# .NET', 'Azure', 'Dapper', 'Supabase', 'OpenAI', 'MCP', 'EventSource', 'JWT'],
			demoLink: '#'
		},
		{
			id: 5,
			title: 'Dave - D&D Campaign Management System',
			description:
				'Advanced Electron-based campaign management system with AI-powered transcript processing, real-time collaboration, ' +
				'canvas-based interface with drag-and-drop customization, audio recording coordination, Foundry VTT integration, ' +
				'and role-based visibility system. Private enterprise application with comprehensive CRUD operations and API throttling.',
			image: '/projects/locked.webp',
			tags: [
				'Electron Vite',
				'SvelteKit 2',
				'Svelte 5',
				'TypeScript',
				'Supabase',
				'Mapbox',
				'Tiptap',
				'OpenAI'
			]
		}
	];

	const setGlobalHidden = async () => {
		await fetch('/api/redis/set-hidden', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(false)
		});
		setTimeout(() => {
			invalidateAll();
		}, 1000);
	};
</script>

<section id="projects" class="relative overflow-hidden bg-volcanic-obsidian py-32">
	<div class="absolute inset-0 opacity-10">
		<div
			class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
		></div>
	</div>
	<div
		class="absolute top-1/4 right-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-earth);"
	></div>
	<div
		class="absolute bottom-1/4 left-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-lava);"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6">
		<div class="mb-20 text-center">
			<h2 class="mb-6 text-gradient-volcanic text-5xl font-bold md:text-6xl">Featured Projects</h2>
			<p class="mx-auto max-w-2xl text-xl text-ash">
				Explore my latest work and creative endeavors forged in code
			</p>
			<div class="divider-lava mx-auto mt-6 w-32"></div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, index}
				<div
					class="card-volcanic group relative overflow-hidden border-transparent hover:border-lava/50"
					style="animation-delay: {index * 0.1}s;"
				>
					{#if project.featured}
						<div class="absolute top-4 right-4 z-20 badge-lava">FEATURED</div>
					{/if}

					<div class="relative h-56 overflow-hidden rounded-t-2xl">
						<img
							src={project.image}
							alt={project.title}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						<div
							class="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80"
							style="background: linear-gradient(to top, var(--color-volcanic-charcoal), rgba(45, 45, 45, 0.8), transparent);"
						></div>

						<div
							class="absolute inset-0 flex items-center justify-center gap-4
								transition-opacity duration-300
								opacity-100 md:opacity-0 md:group-hover:opacity-100"
						>

							{#if project.demoLink}
								{#if project.id === 4}
									<button
										onclick={setGlobalHidden}
										class="flex h-12 w-12 items-center justify-center rounded-full bg-lava transition-all duration-300 hover:scale-110 hover:shadow-lava"
										title="View Demo"
									>
										<svg
											class="h-6 w-6 text-ash-light"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									</button>
								{:else}
									<a
										href={project.demoLink}
										target="_blank"
										rel="noopener noreferrer"
										class="flex h-12 w-12 items-center justify-center rounded-full bg-lava transition-all duration-300 hover:scale-110 hover:shadow-lava"
										title="View Demo"
									>
										<svg
											class="h-6 w-6 text-ash-light"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									</a>
								{/if}
							{/if}
							{#if project.githubLink}
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									class="flex h-12 w-12 items-center justify-center rounded-full bg-earth transition-all duration-300 hover:scale-110 hover:shadow-earth"
									title="View Code"
								>
									<svg class="h-6 w-6 text-ash-light" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
										/>
									</svg>
								</a>
							{/if}
						</div>
					</div>

					<div class="p-6">
						<h3
							class="mb-3 text-2xl font-bold text-lava transition-colors duration-300 group-hover:text-earth"
						>
							{project.title}
						</h3>
						<p class="mb-4 text-ash">
							{project.description}
						</p>

						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="badge-earth text-xs">
									{tag}
								</span>
							{/each}
						</div>
					</div>

					<div
						class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						style="box-shadow: inset 0 0 20px rgba(193, 68, 14, 0.1);"
					></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
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
