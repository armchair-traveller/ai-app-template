import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: 'http://localhost:5173'
});

// You can also export specific methods if you prefer:
export const { signIn, signUp, useSession } = authClient;
