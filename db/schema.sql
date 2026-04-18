-- Herwood Writers' Room — schema v1
-- Run this once against your Vercel Postgres database before enabling the cron.

CREATE TABLE IF NOT EXISTS entries (
  id            SERIAL PRIMARY KEY,
  agent_slug    TEXT NOT NULL,
  headline      TEXT NOT NULL,
  body          TEXT NOT NULL,
  tags          TEXT[] DEFAULT '{}',
  urgency       TEXT CHECK (urgency IN ('low', 'medium', 'high')),
  sources       JSONB DEFAULT '[]',
  verdict       TEXT,
  specific_fix  TEXT,
  actioned      BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entries_created_at ON entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_entries_agent ON entries(agent_slug);
