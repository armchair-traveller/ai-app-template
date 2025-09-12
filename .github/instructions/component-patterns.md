# Svelte Component Patterns

## Component Structure

- Use snippets when reactive state declaration isn't required, not components:
  - ✅ `{#snippet button} { ... } {/snippet}`
  - ❌ `<Button />`

## Props Pattern

- Always define prop types using interfaces:

```ts
import type { Snippet } from 'svelte';
interface ButtonProps {
	variant: 'primary' | 'secondary';
	children: Snippet;
}

let { variant, children }: ButtonProps = $props();
```

## Error Boundaries

- Wrap dynamic content with error boundaries
- Place error boundaries in [components/error-boundary.svelte](/src/components/error-boundary.svelte)

## Loading States

- Use Svelte #await for loading states
- Place loading UI in separate components
- Example:

```svelte
{#await dataPromise}
	<LoadingSpinner />
{:then data}
	<DynamicContent {data} />
{/await}
```
