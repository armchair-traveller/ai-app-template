<script lang="ts">
	import { authClient } from '$lib/auth-client';
	const session = authClient.useSession();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
	{#if $session.data}
		<div>
			<p>Welcome, {$session?.data?.user.name || $session?.data?.user.email}!</p>
			<button
				onclick={async () => {
					await authClient.signOut();
				}}
				>Sign Out
			</button>
		</div>
	{:else}
		<button
			onclick={async () => {
				await authClient.signIn.social({ provider: 'discord' });
			}}
			>Continue with Discord
		</button>
	{/if}
</div>
