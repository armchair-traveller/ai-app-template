# State Management

## Server State

- Use SvelteKit `load` functions for server state management
- Define load functions in `+page.server.ts` or `+layout.server.ts` files
- Example:

```ts
// +page.server.ts
export async function load() {
	const users = await fetchUsers();
	return { users };
}
// +page.svelte
const {
	data: { users }
} = $props();
```

## Form State

- Use `sveltekit-superforms` for form management
- Define form schemas using `zod`
- Example:

```ts
const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

const form = superForm(form, { validators: zodClient(schema) });
```

## Local State

- Keep state as close to where it's used as possible
- Use `$state`, `$derived`, and `$effect` runes for state
- Extract reusable state logic into [lib/hooks](/src/lib/hooks)

## Global State

- Avoid global state when possible
- If needed, use Svelte Context
- Place context providers in [contexts](/src/contexts) directory
