# Herwood Writers' Room

An automated daily standup from seven AI employees at Herwood Creative. Each
agent has a distinct role, voice, and research mandate. A Vercel cron hits
`/api/run-standup` daily; that route fans out to all seven agents in parallel,
each makes an Anthropic call (Sonnet + web search), returns structured JSON,
and the result is written to Vercel Postgres. The dashboard at `/` reads the
day's entries and renders them as cards.

## Scaffolding status

The scaffolding is in. Anthropic calls are **not** wired yet — `runAgent` in
`lib/anthropic.ts` throws, and `app/api/run-standup/route.ts` returns a
placeholder payload. Review the structure, then we'll wire up Kit first as
the smoke test (she doesn't use web search).

## Layout

```
app/
  page.tsx                     dashboard
  agent/[slug]/page.tsx        single-agent view
  api/run-standup/route.ts     cron endpoint — fans out to 7 agents
  api/entries/route.ts         JSON feed
components/
  EntryCard.tsx
  AgentAvatar.tsx
  Dashboard.tsx
lib/
  agents/{bette,tina,shane,alice,dana,kit}.ts         system prompts (Jenny benched)
  agents/index.ts                                      barrel + AGENT_ORDER
  anthropic.ts                                         client + stubbed runAgent
  context.ts                                           Herwood context block
  db.ts                                                Postgres queries
  types.ts                                             AgentOutput, Entry, AgentConfig
db/schema.sql                   one-time migration
vercel.json                     cron config (0 12 * * * UTC = 7am CT)
```

## Setup

1. `npm install`
2. Link the project to Vercel and attach Vercel Postgres (pulls Postgres envs
   into `.env.local` via `vercel env pull`).
3. Add `ANTHROPIC_API_KEY` to `.env.local` and Vercel env vars.
4. Run the schema: `psql $POSTGRES_URL_NON_POOLING -f db/schema.sql`.
5. `npm run dev` and visit <http://localhost:3000>.

## Next steps (once you've reviewed)

1. Wire Kit end-to-end (no web search — simplest smoke test).
2. Add `runAgent` in `lib/anthropic.ts` — Messages call with system prompt,
   enforce JSON output via a tool-use response.
3. Light up the other six agents.
4. Enable the cron.
