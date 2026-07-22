import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { news as mockNews } from "@/lib/data";

// GET /api/news?category=Analysis
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const news = await prisma.news.findMany({
      where: category && category !== "All" ? { category } : {},
      orderBy: { publishedDate: "desc" },
    });
    if (news.length) return NextResponse.json({ source: "db", news });
    throw new Error("empty");
  } catch {
    let news = [...mockNews];
    if (category && category !== "All") news = news.filter((n) => n.category === category);
    news.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    return NextResponse.json({ source: "mock", news });
  }
}
