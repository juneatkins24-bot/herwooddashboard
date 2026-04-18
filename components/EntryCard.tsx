import Link from "next/link";
import AgentAvatar from "./AgentAvatar";
import type { Entry } from "@/lib/types";

const urgencyStyles: Record<string, string> = {
  low: "bg-warm text-night/60 border-night/15",
  medium: "bg-pale text-night border-night/20",
  high: "bg-brick text-porcelain border-brick",
};

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="rounded-lg border border-night/10 bg-porcelain p-6 shadow-sm">
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

      <h2 className="mt-5 font-display text-xl leading-snug text-night">
        {entry.headline}
      </h2>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-night/80">
        {entry.body}
      </p>

      {entry.verdict && (
        <div className="mt-4 rounded border border-night/10 bg-warm/60 p-3 text-xs">
          <div className="uppercase tracking-[0.15em] text-night/60">Verdict</div>
          <div className="mt-1 text-night">{entry.verdict}</div>
          {entry.specific_fix && (
            <>
              <div className="mt-3 uppercase tracking-[0.15em] text-night/60">
                Specific fix
              </div>
              <div className="mt-1 text-night">{entry.specific_fix}</div>
            </>
          )}
        </div>
      )}

      {entry.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-night/10 px-2 py-0.5 text-[11px] text-night/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {entry.sources?.length > 0 && (
        <footer className="mt-4 space-y-1 border-t border-night/10 pt-3 text-xs text-night/60">
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
