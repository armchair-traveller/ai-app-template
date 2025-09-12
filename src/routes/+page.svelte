<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import IconPlus from '~icons/lucide/plus';
	import ChatPage from '$lib/components/chat.svelte';
	import AuthButton from '$lib/components/auth-button.svelte';
	import type { OurMessage } from '$lib/types';

	let { data } = $props();

	const session = authClient.useSession();
	const userName = $derived($session.data?.user?.name ?? 'Guest');
	const isAuthenticated = $derived(!!$session.data?.user);
	const userImage = $derived($session.data?.user?.image);
	const chatId = $derived(page.url.searchParams.get('id') || undefined);

	const chats = $derived((await data.chats) || []);

	// Map the messages to the correct format for Chat class
	const initialMessages = $derived(
		(await data.activeChat)?.messages?.map((msg) => ({
			id: msg.id,
			role: msg.role as 'user' | 'assistant',
			parts: msg.parts as OurMessage['parts']
		})) ?? []
	);
</script>

<div class="flex h-screen bg-gray-950">
	<!-- Sidebar -->
	<div class="flex w-64 flex-col border-r border-gray-700 bg-gray-900">
		<div class="p-4">
			<div class="flex items-center justify-between">
				<h2 class="text-sm font-semibold text-gray-400">Your Chats</h2>
				{#if isAuthenticated}
					<a
						href="/"
						class="flex size-8 items-center justify-center rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						title="New Chat"
					>
						<IconPlus class="size-5" />
					</a>
				{/if}
			</div>
		</div>
		<div
			class="-mt-1 scrollbar-thin flex-1 space-y-2 overflow-y-auto px-4 pt-1 scrollbar-thumb-gray-600 scrollbar-track-gray-800"
		>
			{#if chats.length > 0}
				{#each chats as chat (chat.id)}
					<div class="flex items-center gap-2">
						<a
							href="/?id={chat.id}"
							class="flex-1 rounded-lg p-3 text-left text-sm text-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none {chat.id ===
							chatId
								? 'bg-gray-700'
								: 'hover:bg-gray-750 bg-gray-800'}"
						>
							{chat.title}
						</a>
					</div>
				{/each}
			{:else}
				<p class="text-sm text-gray-500">
					{isAuthenticated
						? 'No chats yet. Start a new conversation!'
						: 'Sign in to start chatting'}
				</p>
			{/if}
		</div>
		<div class="p-4">
			<AuthButton {isAuthenticated} {userImage} />
		</div>
	</div>

	<ChatPage {userName} {isAuthenticated} {chatId} {initialMessages} />
</div>
