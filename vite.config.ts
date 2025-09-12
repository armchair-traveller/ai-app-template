import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import Unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		Unfonts({
			fontsource: {
				families: ['Geist Variable']
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					// evalite-only tests
					include: ['src/evals/**/*.eval.{js,ts}'],
					testTimeout: 60_000,
					sequence: { concurrent: false }
					// optionally, include for app tests
					// include: ['src/**/*.{test,spec}.{js,ts}'],
					// exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
