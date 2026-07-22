import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { teams, players, stadiums, matches, news, flagUrl } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding World Cup 2026 Hub...");

  // Admin + demo user
  const adminPass = await bcrypt.hash("admin1234", 10);
  const userPass = await bcrypt.hash("fan12345", 10);
  await prisma.user.upsert({
    where: { email: "admin@wc26.com" },
    update: {},
    create: { name: "Tournament Admin", email: "admin@wc26.com", password: adminPass, role: "ADMIN", provider: "credentials" },
  });
  await prisma.user.upsert({
    where: { email: "fan@wc26.com" },
    update: {},
    create: { name: "Super Fan", email: "fan@wc26.com", password: userPass, role: "USER", favoriteTeam: "Brazil", provider: "credentials" },
  });

  // Teams
  const teamIdByCode = new Map<string, string>();
  for (const t of teams) {
    const rec = await prisma.team.upsert({
      where: { country: t.country },
      update: {},
      create: {
        country: t.country,
        code: t.code,
        flag: flagUrl(t.code),
        coach: t.coach,
        ranking: t.ranking,
        continent: t.continent,
        group: t.group,
      },
    });
    teamIdByCode.set(t.code, rec.id);
  }

  // Players
  for (const p of players) {
    await prisma.player.create({
      data: {
        name: p.name,
        country: p.country,
        position: p.position,
        club: p.club,
        number: p.number,
        photo: p.photo,
        goals: p.goals,
        assists: p.assists,
        appearances: p.appearances,
        rating: p.rating,
        teamId: teamIdByCode.get(p.code) ?? null,
      },
    });
  }

  // Stadiums
  const stadiumIdByName = new Map<string, string>();
  for (const s of stadiums) {
    const rec = await prisma.stadium.create({
      data: { name: s.name, city: s.city, country: s.country, capacity: s.capacity, image: s.image },
    });
    stadiumIdByName.set(s.name, rec.id);
  }

  // Matches
  for (const m of matches) {
    const homeId = teamIdByCode.get(m.homeCode);
    const awayId = teamIdByCode.get(m.awayCode);
    const stadiumId = stadiumIdByName.get(m.stadium) ?? (stadiums[0] ? stadiumIdByName.get(stadiums[0].name) : undefined);
    if (!homeId || !awayId || !stadiumId) continue;
    await prisma.match.create({
      data: {
        date: new Date(m.date),
        status: m.status,
        homeScore: m.homeScore ?? null,
        awayScore: m.awayScore ?? null,
        minute: m.minute ?? null,
        stage: m.stage,
        homeTeamId: homeId,
        awayTeamId: awayId,
        stadiumId,
      },
    });
  }

  // News
  for (const n of news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        title: n.title,
        slug: n.slug,
        description: n.description,
        image: n.image,
        category: n.category,
        featured: n.featured,
        publishedDate: new Date(n.publishedDate),
      },
    });
  }

  // A sample poll
  await prisma.poll.create({
    data: {
      question: "Who will win the World Cup 2026?",
      options: {
        create: [
          { label: "Argentina", votes: 3120 },
          { label: "France", votes: 2890 },
          { label: "Brazil", votes: 4010 },
          { label: "Spain", votes: 2450 },
        ],
      },
    },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
