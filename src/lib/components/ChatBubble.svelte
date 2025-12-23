<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { sendMessage, getMessages } from '../../routes/chat/data.remote';
	interface Message {
		role: 'user' | 'assistant';
		content: string;
		timestamp: string;
	}

	let { isHidden = $bindable(true) } = $props();

	let isCollapsed = $state(true);
	let isTyping = $state(false);
	let messagesContainer: HTMLDivElement | undefined = $state();

	let messages: Message[] = $state([
		{
			role: 'user',
			content: 'Can you help me optimize my portfolio website?',
			timestamp: '10:23 AM'
		},
		{
			role: 'assistant',
			content:
				"I'd be happy to help! I can analyze your current design, suggest performance improvements, and help with SEO optimization. What specific areas would you like to focus on?",
			timestamp: '10:23 AM'
		},
		{
			role: 'user',
			content: 'I want to improve the loading speed and add some animations.',
			timestamp: '10:24 AM'
		},
		{
			role: 'assistant',
			content:
				'Great choices! For loading speed, we can implement lazy loading for images and code splitting. For animations, I recommend using CSS transitions with GPU acceleration. Would you like me to show you some examples?',
			timestamp: '10:25 AM'
		}
	]);

	let userInput = $state('');

	async function scrollToBottom() {
		await tick();
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	async function handleSend() {
		let previousInput: string;
		if (userInput.trim()) {
			previousInput = userInput;
			userInput = '';

			messages.push({
				role: 'user',
				content: previousInput,
				timestamp: new Date().toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					hour12: true
				})
			});

			await scrollToBottom();

			isTyping = true;
			await scrollToBottom();

			try {
				const response = await sendMessage({ query: previousInput });

				if (!response) {
					userInput = previousInput;
					messages.pop(); 
				} else {

					messages.push({
						role: 'assistant',
						content: response.content || response,
						timestamp: new Date().toLocaleTimeString('en-US', {
							hour: 'numeric',
							minute: '2-digit',
							hour12: true
						})
					});
				}
			} catch (error) {
				console.error('Error sending message:', error);
				userInput = previousInput;
				messages.pop();
			} finally {
				isTyping = false;
				await scrollToBottom();
				alert("An error has occured, please try again later.")
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}

	function toggleCollapse() {
		isCollapsed = !isCollapsed;
	}

	function formatMessage(content: string): string {
		if (!content) return '';

		let formatted = content.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');

		formatted = formatted.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

		formatted = formatted.replace(
			/`(.+?)`/g,
			'<code class="px-1.5 py-0.5 bg-volcanic-obsidian/50 rounded text-lava-light font-mono text-xs">$1</code>'
		);
		formatted = formatted.replace(/\n/g, '<br>');

		return formatted;
	}

	onMount(() => {
		getMessages().then((data) => {
			messages = data;
			scrollToBottom();
		});
	});
</script>

{#if !isHidden}
	{#if isCollapsed}
		<button
			onclick={toggleCollapse}
			class="fixed bottom-6 right-6 z-50 w-16 h-16 bg-lava-glow rounded-full shadow-lava-glow flex items-center justify-center text-ash-light transition-all hover:scale-110 hover:shadow-[0_8px_50px_rgba(193,68,14,0.7)] active:scale-95 group"
			aria-label="Open chat"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-7 h-7 transition-transform group-hover:scale-110"
			>
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
				<path d="M8 10h.01"></path>
				<path d="M12 10h.01"></path>
				<path d="M16 10h.01"></path>
			</svg>
			<span
				class="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-volcanic-obsidian flex items-center justify-center text-[10px] font-bold text-volcanic-obsidian animate-pulse"
			>
			</span>
		</button>
	{:else}
		<div
			class="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out animate-in slide-in-from-bottom-5 fade-in"
		>
			<div
				class="w-96 h-[600px] bg-volcanic-charcoal rounded-2xl shadow-volcanic-lg border border-volcanic-basalt flex flex-col overflow-hidden"
			>
				<div class="bg-lava-glow px-6 py-4 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div
							class="w-10 h-10 bg-volcanic-obsidian rounded-full flex items-center justify-center text-lava-light"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-5 h-5"
							>
								<path d="M12 8V4H8" />
								<rect width="16" height="12" x="4" y="8" rx="2" />
								<path d="M2 14h2" />
								<path d="M20 14h2" />
								<path d="M15 13v2" />
								<path d="M9 13v2" />
							</svg>
						</div>
						<div>
							<h3 class="text-ash-light font-semibold text-lg">AI Assistant</h3>
							<div class="flex items-center gap-1.5 text-xs text-ash-light/80">
								<span
									class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"
								></span>
								<span>{isTyping ? 'Typing...' : 'Online'}</span>
							</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<button
							onclick={toggleCollapse}
							class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-ash-light"
							aria-label="Minimize chat"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-5 h-5"
							>
								<path d="M4 14h6v6" />
								<path d="M20 10h-6V4" />
								<path d="M14 10l7-7" />
								<path d="M3 21l7-7" />
							</svg>
						</button>
						<button
							onclick={() => (isCollapsed = true)}
							class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-ash-light"
							aria-label="Close chat"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-5 h-5"
							>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div
					bind:this={messagesContainer}
					class="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-volcanic-obsidian scroll-smooth"
				>
					{#each messages as message}
						<div
							class="flex gap-3 {message.role === 'user'
								? 'flex-row-reverse'
								: 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300"
						>
							{#if message.role === 'assistant'}
								<div
									class="w-8 h-8 shrink-0 bg-lava-glow rounded-full flex items-center justify-center text-ash-light"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="w-4 h-4"
									>
										<path d="M12 8V4H8" />
										<rect width="16" height="12" x="4" y="8" rx="2" />
										<path d="M2 14h2" />
										<path d="M20 14h2" />
										<path d="M15 13v2" />
										<path d="M9 13v2" />
									</svg>
								</div>
							{/if}
							<div class="flex flex-col gap-1 max-w-[75%]">
								<div
									class="px-4 py-3 rounded-2xl {message.role === 'user'
										? 'bg-lava-glow text-ash-light rounded-tr-sm'
										: 'bg-volcanic-charcoal text-ash-light border border-volcanic-basalt rounded-tl-sm'}"
								>
									<div class="text-sm leading-relaxed formatted-content">
										{@html formatMessage(message.content)}
									</div>
								</div>
								<span
									class="text-xs text-ash/60 {message.role === 'user'
										? 'text-right'
										: 'text-left'} px-2"
								>
									{message.timestamp}
								</span>
							</div>
						</div>
					{/each}

					{#if isTyping}
						<div class="flex gap-3 flex-row animate-in fade-in slide-in-from-bottom-2 duration-300">
							<div
								class="w-8 h-8 shrink-0 bg-lava-glow rounded-full flex items-center justify-center text-ash-light"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="w-4 h-4"
								>
									<path d="M12 8V4H8" />
									<rect width="16" height="12" x="4" y="8" rx="2" />
									<path d="M2 14h2" />
									<path d="M20 14h2" />
									<path d="M15 13v2" />
									<path d="M9 13v2" />
								</svg>
							</div>
							<div class="flex flex-col gap-1 max-w-[75%]">
								<div
									class="px-4 py-3 rounded-2xl bg-volcanic-charcoal border border-volcanic-basalt rounded-tl-sm"
								>
									<div class="flex gap-1.5 items-center h-5">
										<div
											class="w-2 h-2 bg-lava-light rounded-full animate-bounce"
											style="animation-delay: 0ms;"
										></div>
										<div
											class="w-2 h-2 bg-lava-light rounded-full animate-bounce"
											style="animation-delay: 150ms;"
										></div>
										<div
											class="w-2 h-2 bg-lava-light rounded-full animate-bounce"
											style="animation-delay: 300ms;"
										></div>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div class="px-4 py-4 bg-volcanic-charcoal border-t border-volcanic-basalt">
					<div class="flex gap-2 items-end">
						<textarea
							bind:value={userInput}
							onkeydown={handleKeydown}
							placeholder="Type your message..."
							rows="1"
							disabled={isTyping}
							class="flex-1 bg-volcanic-obsidian border border-volcanic-basalt text-ash-light px-4 py-3 rounded-xl resize-none focus:outline-none focus:border-lava focus:ring-2 focus:ring-lava/20 transition-all placeholder:text-ash/50 max-h-32 disabled:opacity-50 disabled:cursor-not-allowed"
						></textarea>
						<button
							onclick={handleSend}
							disabled={!userInput.trim() || isTyping}
							class="w-11 h-11 shrink-0 bg-lava-glow rounded-xl flex items-center justify-center text-ash-light transition-all hover:shadow-lava-glow hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
							title="The chatter"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-5 h-5"
							>
								<path d="m22 2-7 20-4-9-9-4Z" />
								<path d="M22 2 11 13" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<button
		onclick={() => {
			if(isHidden){
				alert("And there, stood a lonely eye, await acknowledgment....")
			}else{
				toggleCollapse()
			}
		}}
		class="fixed bottom-6 right-6 z-50 w-16 h-16 ring-2 ring-lava-dark
			bg-lava-light/50 rounded-full shadow-lava-glow 
			flex items-center justify-center text-ash-light 
			transition-all hover:scale-110 
			hover:shadow-[0_8px_50px_rgba(193,68,14,0.7)] 
			active:scale-95 
			animate-pulse"
		aria-label="Open chat"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="w-7 h-7 transition-transform"
		>
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
			<path d="M8 10h.01"></path>
			<path d="M12 10h.01"></path>
			<path d="M16 10h.01"></path>
		</svg>
</button>
{/if}

<style>
	textarea {
		field-sizing: content;
	}

	.formatted-content :global(em) {
		font-style: italic;
	}

	.formatted-content :global(code) {
		font-family: 'Courier New', monospace;
	}

	.scroll-smooth {
		scroll-behavior: smooth;
	}
</style>
