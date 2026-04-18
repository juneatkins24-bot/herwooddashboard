import Anthropic from "@anthropic-ai/sdk";
import type { AgentConfig, AgentOutput } from "./types";

// Stubbed client + runAgent. Not wired yet — we want to review the
// scaffolding before making real API calls.
//
// When we turn this on:
//   1. Each agent gets one Messages request with its system prompt.
//   2. Agents whose useWebSearch is true get the web_search_20250305 tool.
//   3. The model must return JSON matching AgentOutput. We'll enforce that
//      with a tool-use call (preferred) or response_format hinting + parse.

export const MODEL = "claude-sonnet-4-5-20250929";
export const WEB_SEARCH_TOOL_TYPE = "web_search_20250305" as const;

let _client: Anthropic | null = null;
export function anthropic(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  _client = new Anthropic({ apiKey });
  return _client;
}

export async function runAgent(_agent: AgentConfig): Promise<AgentOutput> {
  // TODO(scaffolding): wire up the real call.
  //
  // Shape will be roughly:
  //
  //   const tools = agent.useWebSearch
  //     ? [{ type: WEB_SEARCH_TOOL_TYPE, name: "web_search", max_uses: 4 }]
  //     : [];
  //
  //   const resp = await anthropic().messages.create({
  //     model: MODEL,
  //     max_tokens: 2048,
  //     system: agent.systemPrompt,
  //     tools,
  //     messages: [{
  //       role: "user",
  //       content: buildUserPrompt(agent, await loadHerwoodContext()),
  //     }],
  //   });
  //
  //   return parseAgentOutput(resp);

  throw new Error("runAgent is not wired up yet");
}
