<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	type OptionalAttrs = Partial<HTMLAnchorAttributes>;

	interface ContactMethod {
		icon: string;
		label: string;
		value: string;
		link?: string;
		optional: OptionalAttrs
	}

	const contactMethods: ContactMethod[] = [
		{
			icon: '📧',
			label: 'Email',
			value: 'frincucristiananton@gmail.com',
			link: 'mailto:frincucristiananton@gmail.com',
			optional:{}
		},
		{
			icon: '📱',
			label: 'Phone',
			value: '+40 771040928',
			link: 'tel:+40771040928',
			optional:{}
		},
		{
			icon: '📍',
			label: 'Location',
			value: 'Constanța, Romania',
			optional:{}
		},
		{
			icon: '📂',
			label: 'CV',
			value: 'Download My CV',
			link: '/resume/Cristian_Anton_Frincu_soft.pdf',
			optional: {
				download: ''
			} 
		}
	];

	interface SocialLink {
		name: string;
		url: string;
		icon: string;
	}
	
	const socialLinks: SocialLink[] = [
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

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let isAnimating = $state(false);
	let isLoading = $state(false);
	async function handleSubmit(event: Event) {
		event.preventDefault();
		isLoading = true;
		const response = await fetch('/api/mail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...formData
			})
		});
		const data = await response.json();
		if (data.success) {
			isAnimating = true;
			setTimeout(() => {
				isAnimating = false;
			}, 6000);
		} else {
			alert('Something went wrong with the message. Please try again later.');
		}
		isLoading = false;
	}
</script>

<section id="contact" class="relative overflow-hidden section-gradient-obsidian py-32">
	<div class="absolute inset-0 opacity-5">
		<div
			class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
		></div>
	</div>
	<div
		class="absolute top-1/4 right-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-lava);"
	></div>
	<div
		class="absolute bottom-1/4 left-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
		style="background: var(--gradient-radial-earth);"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6">
		<div class="mb-20 text-center">
			<h2 class="mb-6 text-gradient-volcanic text-5xl font-bold md:text-6xl">Get In Touch</h2>
			<p class="mx-auto max-w-2xl text-xl text-ash">
				Have a project in mind or want to collaborate? Let's create something amazing together!
			</p>
			<div class="divider-lava mx-auto mt-6 w-32"></div>
		</div>

		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<div class="fade-in-up space-y-8">
				<div class="space-y-6">
					{#each contactMethods as method, index}
						<div
							class="card-volcanic group flex items-center gap-6 hover:border-lava/50"
							style="animation-delay: {index * 0.1}s;"
						>
							<div
								class="flex h-16 w-16 items-center justify-center rounded-full bg-volcanic-basalt text-3xl transition-transform duration-300 group-hover:scale-110"
							>
								{method.icon}
							</div>
							<div class="flex-1">
								<div class="mb-1 text-sm text-ash">{method.label}</div>
								{#if method.link}
									<a href={method.link} class="link-lava text-lg font-semibold" {...method.optional}>
										{method.value}
									</a>
								{:else}
									<div class="text-lg font-semibold text-ash-light">{method.value}</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<div class="pt-8">
					<h3 class="mb-6 text-2xl font-bold text-lava">Connect With Me</h3>
					<div class="flex flex-wrap gap-4">
						{#each socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex h-14 w-14 items-center justify-center rounded-lg border-2 border-volcanic-basalt bg-volcanic-charcoal transition-all duration-300 hover:scale-110 hover:border-lava hover:shadow-lava"
								title={social.name}
							>
								<svg
									class="h-7 w-7 text-ash transition-colors duration-300 group-hover:text-lava"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d={social.icon} />
								</svg>
							</a>
						{/each}
					</div>
				</div>

				<div class="card-volcanic mt-8 border-l-4 border-lava italic text-ash">
					"The best way to predict the future is to create it."
					<div class="mt-2 text-sm text-earth-light">- Let's build together</div>
				</div>
			</div>

			<div class="fade-in-up" style="animation-delay: 0.2s;">
				<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label for="name" class="mb-2 block text-sm font-semibold text-ash-light">
							Your Name
						</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="input-volcanic w-full"
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label for="email" class="mb-2 block text-sm font-semibold text-ash-light">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="input-volcanic w-full"
							placeholder="john@example.com"
						/>
					</div>

					<div>
						<label for="subject" class="mb-2 block text-sm font-semibold text-ash-light">
							Subject
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							class="input-volcanic w-full"
							placeholder="Let's work together"
						/>
					</div>

					<div>
						<label for="message" class="mb-2 block text-sm font-semibold text-ash-light">
							Message
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="input-volcanic w-full resize-none"
							placeholder="Tell me about your project..."
						></textarea>
					</div>

					<button
						type="submit"
						class="btn-lava group flex w-full items-center justify-center gap-3 disabled:opacity-50"
						disabled={isLoading}
					>
						<span>Send Message</span>

						{#if isLoading}
							<svg class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						{:else}
							<svg
								class="h-5 w-5 transition-transform animation-spin"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
	<div
		class="fixed -left-60 bottom-0 z-[99] w-36 h-36"
		style="animation-play-state: {isAnimating ? 'running' : 'paused'}"
		class:fly-out={isAnimating}
	>
		<img class="h-full" src="/mail/mail.png" alt="Flying mail" />
	</div>
</section>

<style>
	.fade-in-up {
		animation: fadeInUp 0.8s ease-out forwards;
		opacity: 0;
	}
	.fly-out {
		animation: flyOut 6s ease-in-out infinite forwards;
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
	@keyframes flyOut {
		0% {
			transform: translate(0, 0) scale(1) skew(0deg);
		}
		30% {
			transform: translate(calc(50vw - 72px), calc(-50vh - 72px)) scale(0.9) skew(3deg, 2deg);
		}
		40% {
			transform: translate(calc(50vw - 72px), calc(-50vh - 72px)) scale(0.85) skew(2deg, 1deg);
		}
		50% {
			transform: translate(calc(50vw - 72px), calc(-50vh - 72px)) scale(0.85) skew(0deg, 0deg);
		}
		100% {
			transform: translate(calc(50vw - 72px), -150vh) scale(0.7) skew(0deg, 0deg) rotateY(120deg);
		}
	}
</style>
