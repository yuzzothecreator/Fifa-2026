import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { matches as mockMatches } from "@/lib/data";

// GET /api/matches?status=LIVE
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const matches = await prisma.match.findMany({
      where: status && status !== "ALL" ? { status: status as never } : {},
      orderBy: { date: "asc" },
      include: { homeTeam: true, awayTeam: true, stadium: true },
    });
    if (matches.length) return NextResponse.json({ source: "db", matches });
    throw new Error("empty");
  } catch {
    let matches = [...mockMatches];
    if (status && status !== "ALL") matches = matches.filter((m) => m.status === status);
    matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return NextResponse.json({ source: "mock", matches });
  }
}
