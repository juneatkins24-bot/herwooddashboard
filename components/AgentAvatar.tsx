import { AGENTS } from "@/lib/agents";

const INITIALS: Record<string, string> = {
  bette: "BP",
  tina: "TK",
  shane: "SM",
  alice: "AP",
  dana: "DF",
  jenny: "JS",
  kit: "KP",
};

export default function AgentAvatar({ slug }: { slug: string }) {
  const agent = AGENTS[slug as keyof typeof AGENTS];
  if (!agent) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-serif text-sm text-paper">
        {INITIALS[slug] ?? slug.slice(0, 2).toUpperCase()}
      </div>
      <div className="leading-tight">
        <div className="font-serif text-base text-ink">{agent.name}</div>
        <div className="text-xs uppercase tracking-[0.15em] text-muted">
          {agent.title}
        </div>
      </div>
    </div>
  );
}
