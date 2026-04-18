import { sql } from "@vercel/postgres";
import type { AgentOutput, Entry } from "./types";

// Thin Postgres wrapper. All queries return typed rows.
// The schema lives in db/schema.sql — run it once against your Vercel
// Postgres database before turning on the cron.

export async function getEntries({
  date,
  agent,
}: {
  date?: string;
  agent?: string;
}): Promise<Entry[]> {
  if (date && agent) {
    const { rows } = await sql<Entry>`
      SELECT * FROM entries
      WHERE agent_slug = ${agent}
        AND created_at::date = ${date}::date
      ORDER BY created_at DESC
    `;
    return rows;
  }
  if (date) {
    const { rows } = await sql<Entry>`
      SELECT * FROM entries
      WHERE created_at::date = ${date}::date
      ORDER BY created_at DESC
    `;
    return rows;
  }
  if (agent) {
    const { rows } = await sql<Entry>`
      SELECT * FROM entries
      WHERE agent_slug = ${agent}
      ORDER BY created_at DESC
    `;
    return rows;
  }
  const { rows } = await sql<Entry>`
    SELECT * FROM entries
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return rows;
}

export async function getEntriesForDate(date: string): Promise<Entry[]> {
  return getEntries({ date });
}

export async function getEntriesForAgent(agent: string): Promise<Entry[]> {
  return getEntries({ agent });
}

export async function insertEntry(
  agentSlug: string,
  output: AgentOutput,
): Promise<Entry> {
  const { rows } = await sql<Entry>`
    INSERT INTO entries
      (agent_slug, headline, body, tags, urgency, sources, verdict, specific_fix)
    VALUES
      (${agentSlug},
       ${output.headline},
       ${output.body},
       ${output.tags as unknown as string},
       ${output.urgency},
       ${JSON.stringify(output.sources)}::jsonb,
       ${output.verdict ?? null},
       ${output.specific_fix ?? null})
    RETURNING *
  `;
  return rows[0];
}

export async function markActioned(id: number, actioned: boolean): Promise<void> {
  await sql`UPDATE entries SET actioned = ${actioned} WHERE id = ${id}`;
}
