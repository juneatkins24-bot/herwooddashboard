import { NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";
// import { runAgent } from "@/lib/anthropic";
// import { insertEntry } from "@/lib/db";

// Cron endpoint must never be cached — Vercel would hit the cache instead of running.
export const dynamic = "force-dynamic";
// Vercel cron hits this once a day (see vercel.json).
// Wall time can approach ~60s with web search, so run on the Node runtime
// and extend the max duration.
export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: Request) {
  // Vercel cron requests include a bearer token we can verify later.
  // For now, accept all requests while scaffolding.
  const auth = request.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slugs = Object.keys(AGENTS);

  // TODO: wire up Anthropic. For now, return the planned fan-out so we can
  // verify the cron path end-to-end before enabling the real calls.
  //
  // const results = await Promise.all(
  //   slugs.map(async (slug) => {
  //     const agent = AGENTS[slug as keyof typeof AGENTS];
  //     const output = await runAgent(agent);
  //     return insertEntry(slug, output);
  //   })
  // );

  return NextResponse.json({
    ok: true,
    scaffolded: true,
    agents: slugs,
    ranAt: new Date().toISOString(),
  });
}
