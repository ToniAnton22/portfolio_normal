<script lang="ts">
	import { getProjectPublic } from '../../remotes/project/projects.remote.js';
	import type { ExtrasType, ProjectDisplay } from '$lib/types';
	import { marked } from 'marked';
	import sanitizeHtml from 'sanitize-html';

	let { data } = $props();

	let key = $derived(data.key);
	const project = (await getProjectPublic(key)) as ProjectDisplay | null;

	// Markdown -> sanitized HTML (safe for public content)
	const readmeHtml =
		project?.details_md
			? sanitizeHtml(marked.parse(project.details_md) as string, {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat([
						'img',
						'h1',
						'h2',
						'h3',
						'h4',
						'pre',
						'code'
					]),
					allowedAttributes: {
						a: ['href', 'name', 'target', 'rel'],
						img: ['src', 'alt', 'title'],
						'*': ['class']
					},
					transformTags: {
						a: (tagName, attribs) => ({
							tagName,
							attribs: {
								...attribs,
								target: '_blank',
								rel: 'noopener noreferrer'
							}
						})
					}
				})
			: '';
</script>

<a 
	href="javascript:history.back()" 
	class="absolute top-4 left-4 z-30 inline-flex items-center gap-2 px-3 py-2 text-ash hover:text-lava transition-colors duration-200"
	aria-label="Go back"
>
	<span aria-hidden="true">←</span>
	<span>Back</span>
</a>
{#if !project}
	<section class="mx-auto max-w-4xl px-6 py-20 text-ash">
		<h1 class="text-3xl font-bold text-lava">Project not found</h1>
		<p class="mt-4">This project key doesn’t exist.</p>
	</section>
{:else}
	<section class="relative overflow-hidden bg-volcanic-obsidian">
		<!-- HERO -->
		<header class="relative">
			<div
				class="absolute inset-0 bg-center bg-cover"
				style="background-image: url('{project.extras.image}');"
				aria-hidden="true"
			/>
			<div
				class="absolute inset-0"
				style="background: linear-gradient(to bottom, rgba(10,10,10,.25), rgba(10,10,10,.88) 60%, rgba(10,10,10,1));"
				aria-hidden="true"
			/>
			<div class="absolute inset-0 opacity-10" aria-hidden="true">
				<div
					class="h-full w-full bg-[linear-gradient(to_right,#4a4a4a_1px,transparent_1px),linear-gradient(to_bottom,#4a4a4a_1px,transparent_1px)] bg-[size:4rem_4rem]"
				/>
			</div>

			<div class="relative mx-auto max-w-6xl px-6 pt-20 pb-12">
				<div class="flex flex-col gap-6">
					<div class="flex flex-wrap items-center gap-3">
						{#if project.extras.featured}
							<div class="badge-lava">FEATURED</div>
						{/if}
						<span class="badge-earth text-xs">/projects/{key}</span>
					</div>

					<h1 class="text-4xl font-bold text-gradient-volcanic md:text-6xl">{project.title}</h1>

					<p class="max-w-3xl text-lg text-ash md:text-xl">
						{project.description}
					</p>

					<!-- actions -->
					<div class="flex flex-wrap items-center gap-3 pt-2">
						{#if project.extras.demoLink}
							<a
								href={project.extras.demoLink ?? "#"}
								target="_blank"
								rel="noopener noreferrer"
								class="btn-lava inline-flex items-center gap-2"
							>
								<span>View Demo</span><span aria-hidden="true">↗</span>
							</a>
						{/if}

						{#if project.extras.githubLink}
							<a
								href={project.extras.githubLink ?? "#"}
								target="_blank"
								rel="noopener noreferrer"
								class="btn-earth inline-flex items-center gap-2"
							>
								<span>View Code</span><span aria-hidden="true">↗</span>
							</a>
						{/if}

						<a href="/#projects" class="btn-ghost inline-flex items-center gap-2">
							<span aria-hidden="true">←</span><span>Back to projects</span>
						</a>
					</div>

					<!-- tags -->
					{#if project?.extras?.displayTags?.length || project.stack?.length}
						<div class="mt-2 flex flex-wrap gap-2">
							{#each project.extras?.displayTags?.length ? project.extras?.displayTags : project.stack as tag}
								<span class="badge-earth text-xs">{tag}</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</header>

		<!-- CONTENT -->
		<main class="mx-auto max-w-6xl px-6 pb-24">
			<div class="grid gap-10 lg:grid-cols-12">
				<!-- Left: Highlights + README -->
				<div class="lg:col-span-8 space-y-10">
					{#if project.highlights?.length}
						<section class="card-volcanic p-8">
							<h2 class="text-2xl font-bold text-lava">Highlights</h2>
							<ul class="mt-4 space-y-3 text-ash">
								{#each project.highlights as h}
									<li class="flex gap-3">
										<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-lava"></span>
										<span>{h}</span>
									</li>
								{/each}
							</ul>
						</section>
					{/if}

					<section class="card-volcanic p-8">
						<div class="flex items-center justify-between gap-4">
							<h2 class="text-2xl font-bold text-lava">README</h2>
							{#if project.details_md}
								<span class="badge-earth text-xs">Markdown</span>
							{/if}
						</div>

						{#if !project.details_md}
							<p class="mt-4 text-ash">
								No README has been added for this project yet.
							</p>
						{:else}
							<!-- Rendered Markdown -->
							<article class="prose prose-invert mt-6 max-w-none prose-headings:text-ash-light prose-a:text-earth prose-strong:text-ash-light">
								{@html readmeHtml}
							</article>
						{/if}
					</section>
				</div>

				<!-- Right: Skills + Stack -->
				<aside class="lg:col-span-4 space-y-6">
					{#if project.skills?.length}
						<section class="card-volcanic p-8">
							<h2 class="text-xl font-bold text-lava">Skills</h2>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each project.skills as s}
									<span class="badge-earth text-xs">{s}</span>
								{/each}
							</div>
						</section>
					{/if}

					{#if project.stack?.length}
						<section class="card-volcanic p-8">
							<h2 class="text-xl font-bold text-lava">Tech Stack</h2>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each project.stack as s}
									<span class="badge-earth text-xs">{s}</span>
								{/each}
							</div>
						</section>
					{/if}
				</aside>
			</div>
		</main>
	</section>
{/if}

<style>
	.btn-lava {
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		background: var(--color-lava, #c1440e);
		color: white;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.btn-lava:hover {
		transform: translateY(-1px);
		box-shadow: 0 10px 30px rgba(193, 68, 14, 0.25);
	}

	.btn-earth {
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		background: var(--color-earth, #3a6b52);
		color: white;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.btn-earth:hover {
		transform: translateY(-1px);
		box-shadow: 0 10px 30px rgba(58, 107, 82, 0.25);
	}

	.btn-ghost {
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.8);
		transition: background 0.2s ease, transform 0.2s ease;
	}
	.btn-ghost:hover {
		background: rgba(255, 255, 255, 0.06);
		transform: translateY(-1px);
	}
</style>
