import Anthropic from "@anthropic-ai/sdk";
import type { AgentConfig, AgentOutput } from "./types";
import { loadHerwoodContext, renderContextBlock } from "./context";

export const MODEL = "claude-sonnet-4-5-20250929";
export const WEB_SEARCH_TOOL_TYPE = "web_search_20250305" as const;

let _client: Anthropic | null = null;
export function anthropic(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  _client = new Anthropic({ apiKey });
  return _client;
}

// The tool whose input_schema defines the AgentOutput shape.
// We force Claude to call it, which guarantees structured JSON.
const REPORT_TOOL = {
  name: "file_standup_entry",
  description:
    "File your daily standup entry for Herwood Creative. Every agent must call this exactly once per run.",
  input_schema: {
    type: "object" as const,
    properties: {
      headline: {
        type: "string",
        description: "One-line summary. Shown as the card title.",
      },
      body: {
        type: "string",
        description: "The insight in the agent's character voice. 2-5 sentences for most agents.",
      },
      tags: {
        type: "array",
        items: { type: "string" },
        description: "Short lowercase tags categorizing the entry.",
      },
      urgency: {
        type: "string",
        enum: ["low", "medium", "high"],
        description: "Agent's own judgment of how much attention this deserves today.",
      },
      sources: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            url: { type: "string" },
          },
          required: ["title", "url"],
        },
        description: "Web sources the agent relied on. Empty array if none.",
      },
      verdict: {
        type: "string",
        enum: ["working", "below_standard", "failing"],
        description: "Bette only. Other agents omit this field.",
      },
      specific_fix: {
        type: "string",
        description: "Bette only. Concrete next action. Other agents omit this field.",
      },
    },
    required: ["headline", "body", "tags", "urgency", "sources"],
  },
};

export async function runAgent(
  agent: AgentConfig,
  extraContext?: string,
): Promise<AgentOutput> {
  const ctx = await loadHerwoodContext();
  const contextBlock = renderContextBlock(ctx);

  const userMessage = [
    "Here is context about Herwood Creative:",
    contextBlock,
    extraContext ? `\nAdditional context:\n${extraContext}` : "",
    "\nProduce your daily standup entry now. File it using the file_standup_entry tool.",
  ]
    .filter(Boolean)
    .join("\n");

  const tools: Anthropic.Messages.Tool[] = [REPORT_TOOL];
  if (agent.useWebSearch) {
    // Server-side web search — Anthropic executes and returns results.
    tools.push({
      type: WEB_SEARCH_TOOL_TYPE,
      name: "web_search",
      max_uses: 4,
    } as unknown as Anthropic.Messages.Tool);
  }

  const resp = await anthropic().messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: agent.systemPrompt,
    tools,
    // Force Claude to call our reporting tool so we get guaranteed JSON.
    // Note: server-side web_search may still be invoked before the final tool call.
    tool_choice: { type: "tool", name: REPORT_TOOL.name },
    messages: [{ role: "user", content: userMessage }],
  });

  // Find the tool_use block matching our reporting tool.
  const toolUse = resp.content.find(
    (block): block is Anthropic.Messages.ToolUseBlock =>
      block.type === "tool_use" && block.name === REPORT_TOOL.name,
  );

  if (!toolUse) {
    throw new Error(
      `Agent ${agent.slug} did not file a standup entry. stop_reason=${resp.stop_reason}`,
    );
  }

  return toolUse.input as AgentOutput;
}
