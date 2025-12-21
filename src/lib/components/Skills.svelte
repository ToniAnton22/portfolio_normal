<script lang="ts">
	const skills: Skill[] = [
		// Frontend
		{ name: 'SvelteKit', level: 95, category: 'frontend', icon: '🔥' },
		{ name: 'Svelte 5', level: 95, category: 'frontend', icon: '🚀' },
		{ name: 'TypeScript', level: 92, category: 'frontend', icon: '📘' },
		{ name: 'React', level: 85, category: 'frontend', icon: '⚛️' },
		{ name: 'Next.js', level: 82, category: 'frontend', icon: '▲' },
		{ name: 'TailwindCSS', level: 94, category: 'frontend', icon: '💨' },
		{ name: 'HTML/CSS', level: 96, category: 'frontend', icon: '🎨' },
		{ name: 'Tiptap', level: 88, category: 'frontend', icon: '✍️' },

		// Backend
		{ name: 'C# .NET Core', level: 90, category: 'backend', icon: '💎' },
		{ name: 'Node.js', level: 88, category: 'backend', icon: '🟢' },
		{ name: 'Fastify', level: 87, category: 'backend', icon: '⚡' },
		{ name: 'Express', level: 85, category: 'backend', icon: '🚂' },
		{ name: 'PostgreSQL', level: 90, category: 'backend', icon: '🐘' },
		{ name: 'Dapper ORM', level: 88, category: 'backend', icon: '🌊' },
		{ name: 'MongoDB', level: 83, category: 'backend', icon: '🍃' },
		{ name: 'Supabase', level: 89, category: 'backend', icon: '⚡' },

		// Tools
		{ name: 'Git', level: 91, category: 'tools', icon: '📦' },
		{ name: 'GitHub Actions', level: 85, category: 'tools', icon: '🔄' },
		{ name: 'Electron', level: 87, category: 'tools', icon: '⚡' },
		{ name: 'AWS', level: 86, category: 'tools', icon: '☁️' },
		{ name: 'Azure', level: 84, category: 'tools', icon: '🌐' },
		{ name: 'Terraform CDKTF', level: 82, category: 'tools', icon: '🏗️' },
		{ name: 'Datadog', level: 80, category: 'tools', icon: '📊' },
		{ name: 'Mapbox', level: 85, category: 'tools', icon: '🗺️' }
	];

	const groupedSkills = {
		frontend: skills.filter((s) => s.category === 'frontend'),
		backend: skills.filter((s) => s.category === 'backend'),
		tools: skills.filter((s) => s.category === 'tools'),
		other: skills.filter((s) => s.category === 'other')
	};

	const categories = [
		{ key: 'frontend', label: 'Frontend', gradient: 'gradient-lava' },
		{ key: 'backend', label: 'Backend', gradient: 'gradient-earth' },
		{ key: 'tools', label: 'Tools & Platforms', gradient: 'gradient-earth-light' }
	];
</script>

<section id="skills" class="relative section-gradient-obsidian py-32">
	<!-- Background effects -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6">
		<!-- Section Header -->
		<div class="mb-20 text-center">
			<h2 class="mb-6 text-gradient-volcanic text-5xl font-bold md:text-6xl">Skills & Expertise</h2>
			<p class="mx-auto max-w-2xl text-xl text-ash">
				<!-- SNIPPET: Update this description -->
				Technologies forged through experience and continuous learning
			</p>
			<div class="divider-lava mx-auto mt-6 w-32"></div>
		</div>

		<!-- Skills by Category -->
		<div class="space-y-16">
			{#each categories as category, catIndex}
				{#if groupedSkills[category.key as keyof typeof groupedSkills].length > 0}
					<div class="fade-in-up" style="animation-delay: {catIndex * 0.2}s;">
						<!-- Category Header -->
						<h3
							class="mb-8 flex items-center gap-3 text-3xl font-bold text-gradient-{category.gradient.split(
								'-'
							)[1]}"
						>
							<span class="h-1 w-12 rounded-full bg-{category.gradient}"></span>
							{category.label}
						</h3>

						<!-- Skills Grid -->
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							{#each groupedSkills[category.key as keyof typeof groupedSkills] as skill, index}
								<div
									class="card-volcanic group relative hover:border-lava/50"
									style="animation-delay: {catIndex * 0.2 + index * 0.05}s;"
								>
									<!-- Skill Name and Icon -->
									<div class="mb-3 flex items-center justify-between">
										<div class="flex items-center gap-3">
											{#if skill.icon}
												<span class="text-2xl">{skill.icon}</span>
											{/if}
											<span class="text-lg font-semibold text-ash-light">{skill.name}</span>
										</div>
										<span class="font-mono text-sm font-bold text-lava">{skill.level}%</span>
									</div>

									<!-- Progress Bar -->
									<div class="relative h-3 overflow-hidden rounded-full bg-volcanic-basalt">
										<!-- Background glow -->
										<div class="absolute inset-0 bg-{category.gradient} opacity-20"></div>

										<!-- Progress fill with animation -->
										<div
											class="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
											style="width: {skill.level}%; background: var(--{category.gradient});"
										>
											<!-- Shine effect -->
											<div
												class="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white to-transparent opacity-30"
											></div>
										</div>

										<!-- Glow effect on hover -->
										<div
											class="absolute top-0 left-0 h-full rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50"
											style="width: {skill.level}%; background: var(--{category.gradient});"
										></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Additional Stats Section -->
		<div class="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="card-lava-accent p-8 text-center">
				<div class="mb-2 text-5xl font-bold text-lava">2+</div>
				<div class="text-ash">Years Experience</div>
			</div>
			<div class="card-earth-accent p-8 text-center">
				<div class="mb-2 text-5xl font-bold text-earth">4+</div>
				<div class="text-ash">Projects Completed</div>
			</div>
			<div class="rounded-lg border border-earth-light/30 bg-volcanic-charcoal p-8 text-center">
				<div class="mb-2 text-5xl font-bold text-earth-light">100%</div>
				<div class="text-ash">Client Satisfaction</div>
			</div>
		</div>
	</div>

	<!-- Floating decorative elements -->
	<div
		class="absolute top-20 right-20 h-64 w-64 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-lava);"
	></div>
	<div
		class="absolute bottom-20 left-20 h-64 w-64 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-earth);"
	></div>
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
