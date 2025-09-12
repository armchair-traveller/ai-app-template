# Styling Conventions

## Size Classes

Use `size-*` classes instead of individual height and width classes:

- ✅ `size-4`
- ❌ `h-4 w-4`
- ✅ `size-5`
- ❌ `h-5 w-5`
- ✅ `size-6`
- ❌ `h-6 w-6`

## Icons

- Use `~icons` for all icons in the application
- Import icons from `~icons` directly:
  - ✅ `import { Search } from "~icons/lucide/search"`

## Toasts

- Use `svelte-sonner` for all toast notifications
- Import from `svelte-sonner`:
  - ✅ `import { toast } from "svelte-sonner"`
