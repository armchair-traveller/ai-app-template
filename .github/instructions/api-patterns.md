# API Patterns

## Route Handlers

- Place API routes in [routes/api](/src/routes/api) directory
- Use SvelteKit Route Handlers with proper HTTP methods
- Example:

```ts
import { json } from '@sveltejs/kit';
export async function GET() {
	try {
		// Implementation
		return json({ data });
	} catch (error) {
		return json({ error: 'Something went wrong' }, { status: 500 });
	}
}
```

## Error Handling

- Always use try/catch blocks in API routes
- Return appropriate HTTP status codes
- Include meaningful error messages
- Common status codes:
  - 200: Success
  - 400: Bad Request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Not Found
  - 500: Internal Server Error

## Authentication

- Use Better-Auth for authentication
- Protect routes using middleware
- Check session in API routes:

```ts
export async function GET({ locals: { session, user } }) {
	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
}
```

## Rate Limiting

- Implement rate limiting for public APIs
- Use [Upstash](/src/lib/upstash.ts) for rate limiting
- Document rate limits in API responses
