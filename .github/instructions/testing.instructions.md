# Testing Standards

## Test File Structure

- Place tests next to the file they test
- Use `.test.ts` or `.svelte.test.ts` extension
- Example:
  - `Button.svelte`
  - `Button.svelte.test.ts`

## Testing Libraries

- Use Vitest as the test runner
- Use Svelte Testing Library for component tests
- Use MSW for API mocking
- Use `@testing-library/user-event` for user interactions

## Component Tests

- Test user interactions and rendering
- Focus on user-facing behavior
- Use a wrapper component for two-way bindings, context, or snippet props
- Example:

```ts
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from './button.svelte';

test('button shows loading state when clicked', async () => {
	render(Button);

	await userEvent.click(screen.getByRole('button'));

	expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

## API Tests

- Mock external services
- Test error cases
- Example:

```ts
import { http, HttpResponse } from 'msw';

test('handles API error', async () => {
	server.use(
		http.get('/api/data', () => {
			return HttpResponse.json({ error: 'Failed' }, { status: 500 });
		})
	);
});
```

## Coverage

- Aim for 80% coverage on business logic
- Run coverage reports with `pnpm test:coverage`
- Focus on testing:
  - User interactions
  - Error handling
  - Edge cases
  - Business logic
