<script lang="ts" module>
	import { remark } from 'remark';
	import remarkGfm from 'remark-gfm';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';

	const process = remark()
		.use(remarkGfm)
		.use(remarkRehype, {
			handlers: {
				// Override default elements with custom styling
				paragraph: (state, node) => {
					return {
						type: 'element',
						tagName: 'p',
						properties: { className: ['mb-4', 'first:mt-0', 'last:mb-0'] },
						children: state.all(node)
					};
				},
				list: (state, node) => {
					const className = node.ordered
						? ['mb-4', 'list-decimal', 'pl-4']
						: ['mb-4', 'list-disc', 'pl-4'];
					return {
						type: 'element',
						tagName: node.ordered ? 'ol' : 'ul',
						properties: { className },
						children: state.all(node)
					};
				},
				listItem: (state, node) => {
					return {
						type: 'element',
						tagName: 'li',
						properties: { className: ['mb-1'] },
						children: state.all(node)
					};
				},
				inlineCode: (state, node) => {
					return {
						type: 'element',
						tagName: 'code',
						properties: {},
						children: [{ type: 'text', value: node.value }]
					};
				},
				code: (state, node) => {
					return {
						type: 'element',
						tagName: 'pre',
						properties: {
							className: ['mb-4', 'overflow-x-auto', 'rounded-lg', 'bg-gray-700', 'p-4']
						},
						children: [
							{
								type: 'element',
								tagName: 'code',
								properties: {},
								children: [{ type: 'text', value: node.value }]
							}
						]
					};
				},
				link: (state, node) => {
					return {
						type: 'element',
						tagName: 'a',
						properties: {
							className: ['text-blue-400', 'underline'],
							href: node.url,
							target: '_blank',
							rel: 'noopener noreferrer'
						},
						children: state.all(node)
					};
				}
			}
		})
		.use(rehypeStringify);

	export { sources, markdown };
</script>

<script lang="ts">
	import ReasoningSteps from './reasoning-steps.svelte';
	import type { OurMessage, Source } from '$lib/types';

	interface Props {
		parts: OurMessage['parts'];
		role: string;
		userName: string;
	}

	let { parts, role, userName }: Props = $props();

	const isAI = $derived(role === 'assistant');

	// Find the latest USAGE annotation (if any)
	const usagePart = $derived(isAI ? parts.findLast((a) => a.type === 'data-usage') : undefined);

	// Get text parts for main content
	const textParts = $derived(parts.filter((part) => part.type === 'text'));
</script>

{#snippet sources(sources: Source[])}
	<div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
		{#each sources as source (source.url)}
			<a
				href={source.url}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-start gap-2 rounded border border-gray-700 bg-gray-800 p-3 text-left hover:bg-gray-700"
			>
				{#if source.favicon}
					<img src={source.favicon} alt="" class="mt-0.5 h-4 w-4 flex-shrink-0" />
				{/if}
				<div class="flex-1">
					<div class="text-sm font-medium text-gray-200">
						{source.title}
					</div>
					<div class="mt-1 text-xs text-gray-400">
						{source.snippet}
					</div>
				</div>
			</a>
		{/each}
	</div>
{/snippet}

{#snippet markdown(content: string)}
	{@const html = process.processSync(content).value}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
{/snippet}

{#snippet usageInfo()}
	{#if isAI && usagePart}
		<div class="mb-2 text-xs text-gray-400">
			Tokens used: {usagePart.data.totalTokens}
		</div>
	{/if}
{/snippet}

<div class="mb-6">
	<div class="rounded-lg p-4 {isAI ? 'bg-gray-800 text-gray-300' : 'bg-gray-900 text-gray-300'}">
		<p class="mb-2 text-sm font-semibold text-gray-400">
			{isAI ? 'AI' : userName}
		</p>

		{#if isAI && parts.length > 0}
			<ReasoningSteps {parts} />
		{/if}

		{@render usageInfo()}

		<div class="prose max-w-none prose-invert">
			{#each textParts as part, partIndex (partIndex)}
				{@render markdown(part.text)}
			{/each}
		</div>
	</div>
</div>
