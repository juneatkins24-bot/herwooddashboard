import Link from "next/link";
import AgentAvatar from "./AgentAvatar";
import type { Entry } from "@/lib/types";

const urgencyStyles: Record<string, string> = {
  low: "bg-paper text-muted border-muted/30",
  medium: "bg-ink/5 text-ink border-ink/20",
  high: "bg-ink text-paper border-ink",
};

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white/60 p-6 shadow-sm">
      <header className="flex items-start justify-between gap-4">
        <Link href={`/agent/${entry.agent_slug}`} className="hover:opacity-80">
          <AgentAvatar slug={entry.agent_slug} />
        </Link>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
            urgencyStyles[entry.urgency] ?? urgencyStyles.low
          }`}
        >
          {entry.urgency}
        </span>
      </header>

      <h2 className="mt-5 font-serif text-xl leading-snug text-ink">
        {entry.headline}
      </h2>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
        {entry.body}
      </p>

      {entry.verdict && (
        <div className="mt-4 rounded border border-ink/10 bg-paper/60 p-3 text-xs">
          <div className="uppercase tracking-[0.15em] text-muted">Verdict</div>
          <div className="mt-1 text-ink">{entry.verdict}</div>
          {entry.specific_fix && (
            <>
              <div className="mt-3 uppercase tracking-[0.15em] text-muted">
                Specific fix
              </div>
              <div className="mt-1 text-ink">{entry.specific_fix}</div>
            </>
          )}
        </div>
      )}

      {entry.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 px-2 py-0.5 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {entry.sources?.length > 0 && (
        <footer className="mt-4 space-y-1 border-t border-ink/10 pt-3 text-xs text-muted">
          <div className="uppercase tracking-[0.15em]">Sources</div>
          {entry.sources.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="block truncate underline-offset-2 hover:underline"
            >
              {src.title}
            </a>
          ))}
        </footer>
      )}
    </article>
  );
}
