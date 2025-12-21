<script lang="ts">
	import { interactiveParallax } from '$lib/uitls/mouseParallax';
	interface TimelineItem {
		year: string;
		title: string;
		company?: string;
		description: string;
		icon?: string;
	}

	const timeline: TimelineItem[] = [
		{
			year: '2025',
			title: 'Contract Web Developer',
			company: 'Don CSN',
			description:
				'Delivering production-grade automotive service management and e-commerce platform with modern tech stack and comprehensive business features.',
			icon: '🚀'
		},
		{
			year: '2024',
			title: 'Junior Software Engineer',
			company: 'Nexus Rental',
			description:
				'Built robust microservices with Node.js and Fastify, implemented serverless invoice processing, created VPN infrastructure, and developed email notification systems with Datadog monitoring.',
			icon: '⚙️'
		},
		{
			year: '2024',
			title: 'MSc Computer Science & Software Engineering',
			company: 'Wrexham University',
			description:
				'Currently pursuing advanced studies in software engineering and computer science, focusing on cutting-edge development practices.',
			icon: '🎓'
		},
		{
			year: '2023',
			title: 'Software Engineer',
			company: 'FellowBot',
			description:
				'Spearheaded AWS migration achieving 99.9% uptime, led tool adoption (Houdini, Perforce), developed Unreal Engine features, and built high-performance backend systems.',
			icon: '💻'
		},
		{
			year: '2023',
			title: 'BSc Software Engineering',
			company: 'Solent University',
			description:
				'Graduated with Second Class Honors (First Division), building strong foundation in software development and engineering principles.',
			icon: '🎓'
		},
		{
			year: '2019',
			title: 'Started Software Engineering Journey',
			description:
				'Began university studies and hands-on learning in web development, programming, and modern software engineering practices.',
			icon: '🌱'
		}
	];
</script>

<section id="about" class="relative overflow-hidden section-charcoal py-32">
	<!-- Background effects -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
		></div>
	</div>
	<div
		class="absolute top-1/3 left-1/4 h-96 w-96 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-lava);"
	></div>
	<div
		class="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-earth);"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6">
		<!-- Section Header -->
		<div class="mb-20 text-center">
			<h2 class="mb-6 text-gradient-volcanic text-5xl font-bold md:text-6xl">About Me</h2>
			<p class="mx-auto max-w-2xl text-xl text-ash">
				<!-- SNIPPET: Update this description -->
				The story behind the code
			</p>
			<div class="divider-lava mx-auto mt-6 w-32"></div>
		</div>

		<!-- Main Content -->
		<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
			<!-- Left Column - Bio and Image -->
			<div class="fade-in-up space-y-8">
				<!-- Profile Image Placeholder -->
				<div class="group relative space-y-20 mt-12">
					<div
						class="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border-4 border-lava/50 shadow-lava-lg"
					>
						<!-- SNIPPET: Replace with your actual image -->
						<img 
							src="/mail/me.jpg" 
							alt="Cristian Anton Frincu" 
							class="w-full h-full object-cover"
						/>

						<!-- Hover overlay -->
						<div
							class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							style="background: linear-gradient(to top, var(--color-volcanic-charcoal), transparent);"
						></div>
					</div>

					<!-- Decorative corners -->
					<div
						class="absolute -top-4 -left-4 h-16 w-16 rounded-tl-2xl border-t-4 border-l-4 border-lava"
					></div>
					<div
						class="absolute -right-4 -bottom-4 h-16 w-16 rounded-br-2xl border-r-4 border-b-4 border-earth"
					></div>
				</div>

				<!-- Bio Text -->
				<div class="space-y-4 text-lg leading-relaxed text-ash">
					<!-- SNIPPET: Update with your own bio -->
					<p>
						Welcome to my digital forge! I'm a passionate developer who loves crafting beautiful,
						functional, and user-centric web experiences. My journey in tech has been driven by
						curiosity and a desire to solve real-world problems through code.
					</p>
					<p>
						With expertise spanning both frontend and backend technologies, I specialize in building
						full-stack applications that are not only visually stunning but also performant and
						scalable. I believe in writing clean, maintainable code and following best practices.
					</p>
					<p>
						When I'm not coding, you'll find me exploring new technologies, contributing to
						open-source projects, or sharing my knowledge with the developer community. I'm always
						excited to collaborate on interesting projects and tackle new challenges.
					</p>
				</div>

				<!-- Quick Stats -->
				<div class="grid grid-cols-3 gap-4 pt-8">
					<!-- SNIPPET: Update these stats -->
					<div class="card-lava-accent p-4 text-center">
						<div class="mb-1 text-3xl font-bold text-lava">2+</div>
						<div class="text-sm text-ash">Years Exp</div>
					</div>
					<div class="card-earth-accent p-4 text-center">
						<div class="mb-1 text-3xl font-bold text-earth">4+</div>
						<div class="text-sm text-ash">Projects</div>
					</div>
					<div class="rounded-lg border border-earth-light/30 bg-volcanic-obsidian p-4 text-center">
						<div class="mb-1 text-3xl font-bold text-earth-light">∞</div>
						<div class="text-sm text-ash">Passion</div>
					</div>
				</div>
			</div>

			<!-- Right Column - Timeline -->
			<div class="fade-in-up" style="animation-delay: 0.2s;">
				<h3 class="mb-8 text-3xl font-bold text-lava">My Journey</h3>

				<div class="relative space-y-8">
					<!-- Timeline line -->
					<div
						class="absolute top-0 bottom-0 left-8 w-0.5"
						style="background: var(--gradient-lava);"
					></div>

					{#each timeline as item, index}
						<div class="fade-in-up relative pl-20" style="animation-delay: {0.3 + index * 0.1}s;">
							<!-- Timeline dot -->
							<div
								class="absolute left-0 z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-lava bg-volcanic-charcoal text-2xl shadow-lava"
							>
								{item.icon || '📍'}
							</div>

							<!-- Content -->
							<div class="card-volcanic hover:border-lava/50">
								<div class="badge-earth mb-2">
									{item.year}
								</div>
								<h4 class="mb-1 text-xl font-bold text-ash-light">{item.title}</h4>
								{#if item.company}
									<p class="mb-2 font-semibold text-earth-light">{item.company}</p>
								{/if}
								<p class="text-ash">{item.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
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
