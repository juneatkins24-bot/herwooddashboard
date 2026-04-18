import { NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";
import { runAgent } from "@/lib/anthropic";
import { insertEntry } from "@/lib/db";

// Cron endpoint must never be cached — Vercel would hit the cache instead of running.
export const dynamic = "force-dynamic";
// Vercel cron hits this once a day (see vercel.json).
// Wall time can approach ~60s with web search, so run on the Node runtime
// and extend the max duration.
export const runtime = "nodejs";
export const maxDuration = 300;

function buildKitExtraContext(): string {
  // Temporary: hardcoded Herwood operational deadlines for Kit.
  // Replace with a deadlines DB query when we model that.
  const deadlines = [
    "B2B agency page (/agency) audit and copy refinement — no hard deadline, but actively in draft",
    "Writers' Room dashboard goes live for internal use — aiming for end of this week",
    "Blog writing practice kickoff — no date set, overdue to be scheduled",
    "Merch concept round one — pending",
    "'System creators' positioning language locked — before next outbound push",
  ];
  return [
    "Herwood operational deadlines and in-flight work:",
    ...deadlines.map((d) => `- ${d}`),
    "\nNote: this is Kit's first run. No prior agent entries exist in the database yet. Focus on operational state-of-things and gently name what needs scheduling.",
  ].join("\n");
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Optional ?only=kit query param — lets us smoke-test one agent at a time.
  const url = new URL(request.url);
  const only = url.searchParams.get("only");

  const slugs = only ? [only] : Object.keys(AGENTS);
  const unknownSlugs = slugs.filter((s) => !(s in AGENTS));
  if (unknownSlugs.length) {
    return NextResponse.json(
      { error: `Unknown agents: ${unknownSlugs.join(", ")}` },
      { status: 400 },
    );
  }

  const results = await Promise.allSettled(
    slugs.map(async (slug) => {
      const agent = AGENTS[slug as keyof typeof AGENTS];
      const extraContext = slug === "kit" ? buildKitExtraContext() : undefined;
      const output = await runAgent(agent, extraContext);
      const entry = await insertEntry(slug, output);
      return { slug, id: entry.id };
    }),
  );

  return NextResponse.json({
    ok: true,
    ranAt: new Date().toISOString(),
    agents: slugs,
    results: results.map((r, i) => ({
      agent: slugs[i],
      status: r.status,
      ...(r.status === "fulfilled" ? { id: r.value.id } : { error: String(r.reason) }),
    })),
  });
}
