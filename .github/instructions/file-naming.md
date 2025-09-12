# File Naming Conventions

- All component files should use dash-case naming convention
  - ✅ `auth-button.svelte`
  - ❌ `AuthButton.svelte`
  - ✅ `delete-chat-button.svelte`
  - ❌ `DeleteChatButton.svelte`

- All files should use TypeScript (.ts/.svelte) instead of JavaScript (.js)
  - ✅ `component.svelte` `<script lang="ts">`
  - ❌ `component.svelte` `<script>`
  - ✅ `utils.ts`
  - ❌ `utils.js`

Components should be placed in the [components](/src/lib/components) directory.
