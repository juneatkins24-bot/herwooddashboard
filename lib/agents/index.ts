import type { AgentConfig } from "../types";
import { bette } from "./bette";
import { tina } from "./tina";
import { shane } from "./shane";
import { alice } from "./alice";
import { dana } from "./dana";
import { kit } from "./kit";

// Jenny (Client Whisperer) is benched pending the Staff Writer rewrite.
// Her prompt is preserved at lib/agents/jenny.ts.bench.

export const AGENTS = {
  bette,
  tina,
  shane,
  alice,
  dana,
  kit,
} satisfies Record<string, AgentConfig>;

export type AgentSlug = keyof typeof AGENTS;

export const AGENT_ORDER: AgentSlug[] = [
  "bette",
  "tina",
  "shane",
  "alice",
  "dana",
  "kit",
];
