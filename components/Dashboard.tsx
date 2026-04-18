import Link from "next/link";
import EntryCard from "./EntryCard";
import { AGENTS, AGENT_ORDER } from "@/lib/agents";
import type { Entry } from "@/lib/types";

function filterHref(date: string, agent: string) {
  const params = new URLSearchParams({ date });
  if (agent !== "all") params.set("agent", agent);
  return `/?${params.toString()}`;
}

export default function Dashboard({
  entries,
  activeDate,
  activeAgent,
}: {
  entries: Entry[];
  activeDate: string;
  activeAgent: string;
}) {
  const visible =
    activeAgent === "all"
      ? entries
      : entries.filter((e) => e.agent_slug === activeAgent);

  const ordered = [...visible].sort(
    (a, b) =>
      AGENT_ORDER.indexOf(a.agent_slug as (typeof AGENT_ORDER)[number]) -
      AGENT_ORDER.indexOf(b.agent_slug as (typeof AGENT_ORDER)[number]),
  );

  return (
    <div>
      <nav className="mb-8 flex flex-wrap gap-2 border-b border-night/10 pb-4 text-xs uppercase tracking-[0.15em]">
        <FilterLink
          label="All"
          href={filterHref(activeDate, "all")}
          active={activeAgent === "all"}
        />
        {AGENT_ORDER.map((slug) => (
          <FilterLink
            key={slug}
            label={AGENTS[slug].name.split(" ")[0]}
            href={filterHref(activeDate, slug)}
            active={activeAgent === slug}
          />
        ))}
      </nav>

      <div className="space-y-6">
        {ordered.length === 0 && (
          <div className="rounded-lg border border-dashed border-night/20 p-8 text-center text-sm text-night/60">
            No entries for {activeDate} yet. The cron runs at 7am Central.
          </div>
        )}
        {ordered.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function FilterLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 transition ${
        active
          ? "border-baby bg-baby text-night"
          : "border-night/20 text-night/60 hover:border-night/40 hover:bg-pale"
      }`}
    >
      {label}
    </Link>
  );
}
