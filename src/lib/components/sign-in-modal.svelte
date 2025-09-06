<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import IconSimpleIconsDiscord from '~icons/simple-icons/discord';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		role="dialog"
		aria-modal="true"
	>
		<div class="w-full max-w-md rounded-lg bg-gray-900 p-6 shadow-xl">
			<h2 class="mb-4 text-xl font-semibold text-gray-200">Sign in required</h2>
			<p class="mb-6 text-gray-400">Please sign in to continue your conversation.</p>
			<div class="flex justify-end gap-3">
				<button onclick={onClose} class="rounded px-4 py-2 text-gray-400 hover:text-gray-300">
					Cancel
				</button>
				<button
					onclick={() => authClient.signIn.social({ provider: 'discord' })}
					class="flex items-center gap-2 rounded bg-[#5865F2] px-4 py-2 text-white hover:bg-[#4752C4] focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					<IconSimpleIconsDiscord class="size-5" aria-hidden="true" />
					Sign in
				</button>
			</div>
		</div>
	</div>
{/if}
