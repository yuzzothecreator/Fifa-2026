import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { players as mockPlayers } from "@/lib/data";

// GET /api/players?position=FWD&q=messi
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const position = searchParams.get("position");
  const q = searchParams.get("q")?.toLowerCase();

  try {
    const players = await prisma.player.findMany({
      where: {
        ...(position && position !== "All" ? { position } : {}),
        ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
      },
      orderBy: { rating: "desc" },
    });
    if (players.length) return NextResponse.json({ source: "db", players });
    throw new Error("empty");
  } catch {
    let players = [...mockPlayers];
    if (position && position !== "All") players = players.filter((p) => p.position === position);
    if (q) players = players.filter((p) => p.name.toLowerCase().includes(q));
    players.sort((a, b) => b.rating - a.rating);
    return NextResponse.json({ source: "mock", players });
  }
}
