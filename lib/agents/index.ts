import type { AgentConfig } from "../types";
import { bette } from "./bette";
import { tina } from "./tina";
import { shane } from "./shane";
import { alice } from "./alice";
import { dana } from "./dana";
import { jenny } from "./jenny";
import { kit } from "./kit";

export const AGENTS = {
  bette,
  tina,
  shane,
  alice,
  dana,
  jenny,
  kit,
} satisfies Record<string, AgentConfig>;

export type AgentSlug = keyof typeof AGENTS;

export const AGENT_ORDER: AgentSlug[] = [
  "bette",
  "tina",
  "shane",
  "alice",
  "dana",
  "jenny",
  "kit",
];
