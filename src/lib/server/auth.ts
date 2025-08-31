import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import {
	BETTER_AUTH_SECRET,
	BETTER_AUTH_URL,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET
} from '$env/static/private';
import { db } from './db';

/**
 * Options for Better Auth used to configure adapters, providers, plugins, etc.
 *
 * @see https://better-auth.com/docs/reference/options
 */
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite' // for libSQL/Turso
		/**
		 * `schema` is required if table names differ from the default
		 *
		 * @see https://www.better-auth.com/docs/adapters/drizzle#additional-information
		 */
	}),
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_URL,
	socialProviders: {
		discord: { clientId: DISCORD_CLIENT_ID, clientSecret: DISCORD_CLIENT_SECRET }
		/**
		 * ...add more providers here. Some require more work than others.
		 * Refer to the Better Auth docs for the provider you want to use. Example:
		 *
		 * @see https://www.better-auth.com/docs/authentication/github
		 */
	},
	plugins: [
		sveltekitCookies(getRequestEvent) // SvelteKit cookie handling - must be last plugin
	]
	/**
	 * For session/user data. Update types in `app.d.ts` Locals. Consider module augmentation.
	 *
	 * Options:
	 * 1. Add fields to user/session objects.
	 *    @see https://better-auth.com/docs/concepts/typescript#additional-fields
	 *
	 * 2. Use the session data plugin for runtime-computed fields.
	 *    @see https://better-auth.com/docs/concepts/session-management#custom-session-data
	 */
});
