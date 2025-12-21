<script lang="ts">
	const currentYear = new Date().getFullYear();

	interface FooterSection {
		title: string;
		links: { label: string; href?: string; download?: string }[];
	}

	const footerSections: FooterSection[] = [
		{
			title: 'Quick Links',
			links: [
				{ label: 'Home', href: '#home' },
				{ label: 'About', href: '#about' },
				{ label: 'Projects', href: '#projects' },
				{ label: 'Skills', href: '#skills' },
				{ label: 'Contact', href: '#contact' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'Blog', href: '#' },
				{ label: 'Case Studies', href: '#' },
				{ label: 'Resume', href: '/resume/Cristian_Anton_Frincu_soft.pdf', download: true },
				{ label: 'Testimonials', href: '#' }
			]
		},
		{
			title: 'Legal',
			links: [
				{ label: 'Privacy Policy', href: '#' },
				{ label: 'Terms of Use', href: '#' },
				{ label: 'Sitemap', href: '#' }
			]
		}
	];

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/ToniAnton22',
			icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/cristian-anton-frincu/',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		}
	];
</script>

<footer class="relative overflow-hidden border-t border-volcanic-basalt bg-volcanic-obsidian">
	<div class="absolute inset-0 opacity-5">
		<div
			class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
		></div>
	</div>
	<div class="divider-lava absolute top-0 left-1/2 w-full -translate-x-1/2 opacity-50"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-16">
		<div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
			<div class="lg:col-span-2">
				<a href="#home" class="group mb-6 flex items-center space-x-2">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-lava transition-all duration-300 group-hover:rotate-180 group-hover:border-earth"
					>
						<span class="text-2xl font-bold text-lava group-hover:text-earth">{'<>'}</span>
					</div>
					<span class="text-gradient-lava text-2xl font-bold"> See you back on Top </span>
				</a>

				<p class="mb-6 leading-relaxed text-ash">
					Building digital experiences with passion and precision. Transforming ideas into reality
					through code and creativity.
				</p>

				<div class="flex gap-3">
					{#each socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group flex h-10 w-10 items-center justify-center rounded-lg border border-volcanic-basalt bg-volcanic-charcoal transition-all duration-300 hover:scale-110 hover:border-lava hover:shadow-lava"
							title={social.name}
						>
							<svg
								class="h-5 w-5 text-ash transition-colors duration-300 group-hover:text-lava"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d={social.icon} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			{#each footerSections as section}
				<div>
					<h3 class="mb-4 text-lg font-bold text-lava">{section.title}</h3>
					<ul class="space-y-2">
						{#each section.links as link}
							<li>
								<a href={link.href} {...(link.download ? { download: '' } : {})} class="link-earth group flex items-center gap-2">
									<span
										class="h-0.5 w-0 transition-all duration-300 group-hover:w-4"
										style="background: var(--color-earth);"
									></span>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="divider-volcanic flex flex-col items-center justify-between gap-4 pt-6 md:flex-row">
			<div class="text-center mx-auto p-2 text-sm text-ash md:text-left">
				<p>
					© {currentYear}
					<span class="font-semibold text-lava">Cristian Anton Frincu</span>. All rights reserved.
				</p>
				<p class="mt-1 text-xs text-volcanic-slate">
					Built with
					<span class="text-earth">♥</span>
					using SvelteKit, Tailwind CSS and Redis
				</p>
			</div>

			<a
				href="#home"
				class="group items-center gap-2 rounded-lg border border-volcanic-basalt bg-volcanic-charcoal px-4 py-2 transition-all duration-300 hover:border-lava hover:shadow-lava hidden"
			>
				<span class="text-sm text-ash transition-colors duration-300 group-hover:text-lava"
					>Back to Top</span
				>
				<svg
					class="h-4 w-4 text-lava transition-transform duration-300 group-hover:-translate-y-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 10l7-7m0 0l7 7m-7-7v18"
					/>
				</svg>
			</a>
		</div>
	</div>

	<div
		class="absolute right-0 bottom-0 left-0 h-px opacity-50"
		style="background: var(--gradient-lava);"
	></div>
</footer>
