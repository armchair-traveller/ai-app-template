# Project Structure

## Key Files and Directories

### App Routes

- [$lib/components/chat.svelte](/src/lib/components/chat.svelte) - Client-side chat implementation with `Chat`
- [routes/+page.svelte](/src/routes/+page.svelte) - Main page
- [routes/api/chat/+server.ts](/src/routes/api/chat/+server.ts) - API route for chat implementation

### Core Files

- [model.ts](/src/lib/model.ts) - Model declarations
- [serper.ts](/src/lib/serper.ts) - Serper implementation
- [types.ts](/src/lib/types.ts) - Shared types
- [utils.ts](/src/lib/utils.ts) - Utility functions

### Database

- [server/db/schema.ts](/src/lib/server/db/schema.ts) - Drizzle schema definitions
- [server/db/queries.ts](/src/lib/server/db/queries.ts) - Database helper functions

### Authentication

- [server/auth.ts](/src/lib/server/auth.ts) - Better-Auth powered authentication

### Configuration

- [.env](.env) - Environment variables
- `$env/static/private`, `$env/dynamic/private`, `$env/static/public`, `$env/dynamic/public` - Type-safe environment variable validation

## Package Management

- Use `pnpm` as the package manager
- Run `pnpm run db:push` after making changes to the database schema
