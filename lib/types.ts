export type Urgency = "low" | "medium" | "high";

export type Source = {
  title: string;
  url: string;
};

// Shared shape returned by every agent.
export type AgentOutput = {
  headline: string;
  body: string;
  tags: string[];
  urgency: Urgency;
  sources: Source[];
  // Bette-only fields. Other agents leave these undefined.
  verdict?: "working" | "below_standard" | "failing";
  specific_fix?: string;
};

export type Entry = AgentOutput & {
  id: number;
  agent_slug: string;
  actioned: boolean;
  created_at: string;
};

export type AgentConfig = {
  slug: string;
  name: string;
  title: string;
  blurb: string;
  useWebSearch: boolean;
  systemPrompt: string;
};
