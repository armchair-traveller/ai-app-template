<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import IconSimpleIconsDiscord from '~icons/simple-icons/discord';
	import { Image } from '@unpic/svelte';

	interface Props {
		isAuthenticated: boolean;
		userImage: string | null | undefined;
	}

	let { isAuthenticated, userImage }: Props = $props();
</script>

{#if isAuthenticated}
	<div class="hover:bg-gray-750 flex items-center gap-2 rounded-lg bg-gray-800 p-2 text-gray-300">
		{#if userImage}
			<Image src={userImage} alt="User avatar" width={32} height={32} class="rounded-full" />
		{/if}
		<button
			onclick={() => {
				goto('/');
				authClient.signOut();
			}}
			class="flex w-full items-center justify-center p-1 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
		>
			Sign out
		</button>
	</div>
{:else}
	<button
		onclick={() => authClient.signIn.social({ provider: 'discord' })}
		class="hover:bg-gray-750 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 p-3 text-sm text-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
	>
		<IconSimpleIconsDiscord class="h-4 w-4" />
		Sign in
	</button>
{/if}
