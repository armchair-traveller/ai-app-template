<script lang="ts">
	import IconMdiMagnify from '~icons/mdi/magnify';
	import type { OurMessage } from '$lib/types';
	import { markdown, sources } from './chat-message.svelte';

	interface Props {
		parts: OurMessage['parts'];
	}

	let { parts }: Props = $props();

	let openStep: number | null = $state(null);
</script>

<div class="mb-4 w-full">
	<ul class="space-y-1">
		{#each parts as part, index (index)}
			{@const isOpen = openStep === index}
			<li class="relative">
				<button
					onclick={() => (openStep = isOpen ? null : index)}
					class="flex w-full min-w-34 flex-shrink-0 items-center rounded px-2 py-1 text-left text-sm transition-colors {isOpen
						? 'bg-gray-700 text-gray-200'
						: 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'}"
				>
					<span
						class="z-10 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-500 text-xs font-bold {isOpen
							? 'border-blue-400 text-white'
							: 'bg-gray-800 text-gray-300'}"
					>
						{index + 1}
					</span>
					{part.type === 'data-new-action' ? part.data.title : 'Sources'}
				</button>
				<div class={isOpen ? 'mt-1' : 'hidden'}>
					{#if isOpen}
						<div class="px-2 py-1">
							{#if part.type === 'data-new-action'}
								<div class="text-sm text-gray-400 italic">
									{@render markdown(part.data.reasoning)}
								</div>
								{#if part.data.type === 'continue'}
									<div class="mt-2 flex flex-col gap-2 text-sm text-gray-400">
										<div class="flex items-center gap-2">
											<IconMdiMagnify class="size-4" />
											<span>Continuing search...</span>
										</div>
										<div class="mt-2 border-l-2 border-gray-700 pl-4">
											<div class="font-medium text-gray-300">Feedback:</div>
											{@render markdown(part.data.feedback || '')}
										</div>
									</div>
								{/if}
							{:else if part.type === 'data-sources'}
								{@render sources(part.data)}
							{/if}
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>
