based on DeepSearch final day already migrated to AI SDK v5 (main: 07-migrated-to-v5)

- Doesn't include optional implementations not in that folder.

---

Could use for future: @upstash/ratelimit for rate limiting

---

Svelte doesn't have a well-maintained markdown rebuild of react-markdown, so using the underlying tech: vanilla-compatible remark+rehype, which is just a little bit more verbose. If custom component syntax is desired, can use snippets or attach components.

---

The database is really simple and can be easily changed out e.g. to Jazz or self-hosted. Using Supabase isn't a good idea with Drizzle. Xata is another option for Postgres, but Turso is more popular.

---

Social profile images aren't optimized by us. There's not much benefit in that when it's already delivered via the provider's CDN. In fact, `@unpic/svelte` isn't doing anything here and can be removed, but it's left in place just for the similar syntax, and in case we want to use it for cdn-serviced images

---

ESLint-TS rules not the same, but I would recommend using Unicorn and/or Sonar which would enforce the same linting rules requiring type info. Everyone has their own preferences, so it doesn't matter that much. You can get it working the same given enough effort, but it was a hefty time investment in my experience so left it as recommended.
