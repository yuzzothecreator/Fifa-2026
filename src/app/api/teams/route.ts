import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teams as mockTeams } from "@/lib/data";

// GET /api/teams?continent=Europe&q=bra
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const continent = searchParams.get("continent");
  const q = searchParams.get("q")?.toLowerCase();

  try {
    const teams = await prisma.team.findMany({
      where: {
        ...(continent && continent !== "All" ? { continent } : {}),
        ...(q ? { country: { contains: q, mode: "insensitive" } } : {}),
      },
      orderBy: { ranking: "asc" },
    });
    if (teams.length) return NextResponse.json({ source: "db", teams });
    throw new Error("empty");
  } catch {
    // Fallback to mock data when the DB is not provisioned
    let teams = [...mockTeams];
    if (continent && continent !== "All") teams = teams.filter((t) => t.continent === continent);
    if (q) teams = teams.filter((t) => t.country.toLowerCase().includes(q));
    teams.sort((a, b) => a.ranking - b.ranking);
    return NextResponse.json({ source: "mock", teams });
  }
}
