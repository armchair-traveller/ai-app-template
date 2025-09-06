// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: import('better-auth').Session;
			user?: import('better-auth').User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Refer to https://icones.js.org/ for list of icons
import type * as Icons from 'unplugin-icons/types/svelte';
export default Icons;

export {};
