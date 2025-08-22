import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$env/static/private';
import { db } from './server/db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite' // for libSQL/Turso
	}),
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_URL,
	plugins: [
		sveltekitCookies(getRequestEvent) // SvelteKit cookie handling - must be last plugin
	]
});
