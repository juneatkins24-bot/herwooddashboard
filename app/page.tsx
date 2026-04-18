import Dashboard from "@/components/Dashboard";
import { getEntriesForDate } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { date?: string; agent?: string };
}) {
  const date = searchParams.date ?? new Date().toISOString().slice(0, 10);
  const entries = await getEntriesForDate(date).catch(() => []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Herwood Creative
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink">
          The Writers' Room
        </h1>
        <p className="mt-2 text-sm text-muted">
          Daily standup — {date}
        </p>
      </header>

      <Dashboard
        entries={entries}
        activeDate={date}
        activeAgent={searchParams.agent ?? "all"}
      />
    </main>
  );
}
