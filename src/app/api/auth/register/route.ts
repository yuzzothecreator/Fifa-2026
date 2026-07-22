import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// POST /api/auth/register  { name, email, password, favoriteTeam? }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, favoriteTeam } = body ?? {};

    if (!name || !email || !password) {
      return NextResponse.json({ error: "name, email and password are required" }, { status: 400 });
    }
    if (String(password).length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, favoriteTeam, provider: "credentials" },
      select: { id: true, name: true, email: true, role: true, favoriteTeam: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    // Likely no database configured in this environment
    return NextResponse.json(
      { error: "Database unavailable. Configure DATABASE_URL and run `npm run prisma:push` to enable auth." },
      { status: 503 }
    );
  }
}
