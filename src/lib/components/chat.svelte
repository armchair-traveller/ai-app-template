<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';
	import { DefaultChatTransport } from 'ai';
	import { goto } from '$app/navigation';
	import IconLoader2 from '~icons/lucide/loader-2';
	import { ChatMessage } from './chat-message';
	import SignInModal from './sign-in-modal.svelte';
	import type { OurMessage } from '$lib/types';

	interface Props {
		userName: string;
		isAuthenticated: boolean;
		chatId: string | undefined;
		initialMessages: OurMessage[];
	}

	let { userName, isAuthenticated, chatId, initialMessages }: Props = $props();

	let showSignInModal = $state(false);
	let input = $state('');

	const chat = new Chat<OurMessage>({
		transport: new DefaultChatTransport({ body: { chatId } }),
		messages: initialMessages,
		onData: (dataPart) => {
			if (dataPart.type === 'data-new-chat-created') {
				goto(`?id=${dataPart.data.chatId}`);
			}
		}
	});

	const isLoading = $derived(chat.status === 'streaming');

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!isAuthenticated) {
			showSignInModal = true;
			return;
		}

		chat.sendMessage({
			text: input
		});
		input = '';
	}
</script>

<div class="flex flex-1 flex-col">
	<div
		class="mx-auto scrollbar-thin w-full max-w-[65ch] flex-1 overflow-y-auto p-4 scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500"
		role="log"
		aria-label="Chat messages"
	>
		{#each chat.messages as message, index (index)}
			<ChatMessage parts={message.parts ?? []} role={message.role} {userName} />
		{/each}
	</div>

	<div class="border-t border-gray-700">
		<form onsubmit={handleSubmit} class="mx-auto max-w-[65ch] p-4">
			<div class="flex gap-2">
				<!-- svelte-ignore a11y_autofocus -->
				<input
					bind:value={input}
					placeholder="Say something..."
					autofocus
					aria-label="Chat input"
					class="flex-1 rounded border border-gray-700 bg-gray-800 p-2 text-gray-200 placeholder-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50"
				/>
				<button
					type="submit"
					disabled={isLoading}
					class="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 focus:border-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:opacity-50 disabled:hover:bg-gray-700"
				>
					{#if isLoading}
						<IconLoader2 class="size-4 animate-spin" />
					{:else}
						Send
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>

<SignInModal isOpen={showSignInModal} onClose={() => (showSignInModal = false)} />
