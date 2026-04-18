// Herwood context that gets injected into every agent's user message.
// Kept as a single string for now; swap for DB-backed tables later.

export type HerwoodContext = {
  studio: string;
  principals: string[];
  activeClients: string[];
  legacyWork: string[];
  peerStudios: string[];
  properties: { url: string; note: string }[];
  internalProjects: string[];
  today: string;
};

export async function loadHerwoodContext(): Promise<HerwoodContext> {
  return {
    studio: "Herwood Creative",
    principals: ["June Atkins", "Em"],
    // Herwood Creative has no external client roster in V1 of the Writers' Room.
    // Client work June does under other engagements is out of scope for these agents.
    activeClients: [],
    legacyWork: [
      "The Herwood Inn (founded, sold 2021 — origin story, proof of built-and-shipped)",
    ],
    peerStudios: [
      "Gretel",
      "Order",
      "Porto Rocha",
      "Collins",
      "Elmwood",
      "Pentagram (smaller teams)",
    ],
    properties: [
      { url: "herwoodcreative.com", note: "Main site" },
      { url: "herwoodcreative.com/agency", note: "B2B / agency pitch page — primary sales surface" },
      { url: "juneatkins.com", note: "Personal portfolio" },
      { url: "herwood-signal.vercel.app", note: "Herwood Signal brand intelligence tool" },
    ],
    // Internal work Herwood is driving itself — what Kit tracks, Tina strategizes
    // about, Alice connects, and Shane aesthetically frames.
    internalProjects: [
      "Auto tracker dashboard (this Writers' Room)",
      "B2B site audit and refinement (/agency page)",
      "'System creators' positioning work",
      "Blog concepts and writing practice",
      "Merch product line",
      "Internal team presentation for pitch decks",
    ],
    today: new Date().toISOString().slice(0, 10),
  };
}

export function renderContextBlock(ctx: HerwoodContext): string {
  const props = ctx.properties.map((p) => `- ${p.url} — ${p.note}`).join("\n");
  const projects = ctx.internalProjects.map((p) => `- ${p}`).join("\n");
  return [
    `Studio: ${ctx.studio}`,
    `Principals: ${ctx.principals.join(", ")}`,
    `Active external clients: ${ctx.activeClients.length ? ctx.activeClients.join(", ") : "(none — Writers' Room focuses on Herwood Creative itself in V1)"}`,
    `Studio origin story: ${ctx.legacyWork.join("; ")}`,
    `Peer studios Herwood wants to be mentioned alongside: ${ctx.peerStudios.join(", ")}`,
    `Web properties:\n${props}`,
    `Internal projects in flight:\n${projects}`,
    `Today's date: ${ctx.today}`,
  ].join("\n\n");
}
