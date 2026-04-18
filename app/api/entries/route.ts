import { NextResponse } from "next/server";
import { getEntries } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? undefined;
  const agent = searchParams.get("agent") ?? undefined;

  const entries = await getEntries({ date, agent }).catch(() => []);
  return NextResponse.json({ entries });
}
