<!-- 
  Footer Component - Volcanic Theme
  
  PURPOSE: Site footer with copyright, links, and additional information
  
  CUSTOMIZATION POINTS:
  1. Update copyright information and year
  2. Add or modify footer links
  3. Update social media links
  4. Add additional sections (newsletter, sitemap, etc.)
  5. Customize the styling and layout
-->

<script lang="ts">
	const currentYear = new Date().getFullYear();

	// SNIPPET: Define footer navigation sections
	interface FooterSection {
		title: string;
		links: { label: string; href: string }[];
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
				{ label: 'Resume', href: '#' },
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

	// SNIPPET: Define social media links
	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/yourusername',
			icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/yourusername',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/yourusername',
			icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
		},
		{
			name: 'Discord',
			url: 'https://discord.gg/yourinvite',
			icon: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z'
		}
	];
</script>

<footer class="relative overflow-hidden border-t border-volcanic-basalt bg-volcanic-obsidian">
	<!-- Background effects -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
		></div>
	</div>
	<div class="divider-lava absolute top-0 left-1/2 w-full -translate-x-1/2 opacity-50"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-16">
		<!-- Main Footer Content -->
		<div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
			<!-- Brand Section -->
			<div class="lg:col-span-2">
				<!-- Logo/Brand -->
				<a href="#home" class="group mb-6 flex items-center space-x-2">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-lava transition-all duration-300 group-hover:rotate-180 group-hover:border-earth"
					>
						<span class="text-2xl font-bold text-lava group-hover:text-earth">{'<>'}</span>
					</div>
					<span class="text-gradient-lava text-2xl font-bold">
						<!-- SNIPPET: Update with your brand name -->
						Your Portfolio
					</span>
				</a>

				<!-- Description -->
				<p class="mb-6 leading-relaxed text-ash">
					<!-- SNIPPET: Update with your own description -->
					Building digital experiences with passion and precision. Transforming ideas into reality through
					code and creativity.
				</p>

				<!-- Social Links -->
				<div class="flex gap-3">
					{#each socialLinks as social}
						<!-- SNIPPET: Update URLs to your actual social media profiles -->
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

			<!-- Footer Navigation Sections -->
			{#each footerSections as section}
				<div>
					<h3 class="mb-4 text-lg font-bold text-lava">{section.title}</h3>
					<ul class="space-y-2">
						{#each section.links as link}
							<!-- SNIPPET: Update these links to your actual pages -->
							<li>
								<a href={link.href} class="link-earth group flex items-center gap-2">
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

		<!-- Bottom Bar -->
		<div class="divider-volcanic flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
			<!-- Copyright -->
			<div class="text-center text-sm text-ash md:text-left">
				<!-- SNIPPET: Update with your name and information -->
				<p>
					© {currentYear}
					<span class="font-semibold text-lava">Cristian Anton Frincu</span>. All rights reserved.
				</p>
				<p class="mt-1 text-xs text-volcanic-slate">
					Built with
					<span class="text-earth">♥</span>
					using SvelteKit & Tailwind CSS
				</p>
			</div>

			<!-- Back to Top Button -->
			<a
				href="#home"
				class="group flex items-center gap-2 rounded-lg border border-volcanic-basalt bg-volcanic-charcoal px-4 py-2 transition-all duration-300 hover:border-lava hover:shadow-lava"
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

	<!-- Decorative bottom glow -->
	<div
		class="absolute right-0 bottom-0 left-0 h-px opacity-50"
		style="background: var(--gradient-lava);"
	></div>
</footer>
