import Link from "next/link";
import { notFound } from "next/navigation";
import EntryCard from "@/components/EntryCard";
import { AGENTS } from "@/lib/agents";
import { getEntriesForAgent } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AgentPage({
  params,
}: {
  params: { slug: string };
}) {
  const agent = AGENTS[params.slug as keyof typeof AGENTS];
  if (!agent) notFound();

  const entries = await getEntriesForAgent(params.slug).catch(() => []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/" className="text-xs uppercase tracking-[0.2em] text-night/60">
        ← Back to feed
      </Link>
      <header className="mt-6 mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-night/60">
          {agent.title}
        </p>
        <h1 className="mt-2 font-display text-4xl text-night">{agent.name}</h1>
        <p className="mt-3 max-w-xl text-sm text-night/60">{agent.blurb}</p>
      </header>

      <div className="space-y-6">
        {entries.length === 0 && (
          <p className="text-sm text-night/60">No entries yet.</p>
        )}
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </main>
  );
}
