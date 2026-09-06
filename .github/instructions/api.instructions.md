---
applyTo: "app/api/**/*.ts"
---

# API route rules

- `app/api/ai/route.ts` is the only route handler this app should have. It exists
  solely to keep the model API key off the client.
- Never read a secret with `process.env` anywhere outside this directory.
- Always return JSON with an explicit HTTP status.
- **Never let this route throw.** Wrap the upstream call and fall back to the
  canned response in `lib/ai-fallback.ts`. A rate limit during the demo must
  degrade to a plausible answer, not a stack trace.
- Validate the request body with `zod` and return 400 on failure.
- Do not add auth, rate limiting, logging middleware or caching.
