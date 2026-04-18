// Herwood context that gets injected into every agent's user message.
// Kept as a single string for now; swap for a DB-backed clients table later.

export type HerwoodContext = {
  studio: string;
  principals: string[];
  activeClients: string[];
  peerStudios: string[];
  properties: string[];
  today: string;
};

export async function loadHerwoodContext(): Promise<HerwoodContext> {
  return {
    studio: "Herwood Creative",
    principals: ["June Atkins", "Em"],
    activeClients: [
      "Popmenu",
      "Sysco (via Popmenu)",
      "Aware Technologies",
      "Sungate Music Group",
      "SCADpro",
    ],
    peerStudios: [
      "Gretel",
      "Order",
      "Porto Rocha",
      "Collins",
      "Elmwood",
      "Pentagram (smaller teams)",
    ],
    properties: ["herwoodcreative.com", "juneatkins.com"],
    today: new Date().toISOString().slice(0, 10),
  };
}

export function renderContextBlock(ctx: HerwoodContext): string {
  return [
    `Studio: ${ctx.studio}`,
    `Principals: ${ctx.principals.join(", ")}`,
    `Active clients: ${ctx.activeClients.join(", ")}`,
    `Peer studios: ${ctx.peerStudios.join(", ")}`,
    `Web properties: ${ctx.properties.join(", ")}`,
    `Today: ${ctx.today}`,
  ].join("\n");
}
