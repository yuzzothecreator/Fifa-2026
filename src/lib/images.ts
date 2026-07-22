/**
 * Reliable real-image helpers for World Cup 2026 Hub.
 * Unsplash stadium / football photography (stable CDN).
 */

export const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

/** Distinct real stadium / arena photography */
export const STADIUM_IMAGES = {
  azteca: unsplash("photo-1508098682722-e99c43a406b2"),
  metlife: unsplash("photo-1522778119026-d647f0596c20"),
  att: unsplash("photo-1577223625816-7546f13df25d"),
  sofi: unsplash("photo-1459865264687-595d652de67e"),
  arrowhead: unsplash("photo-1489944440615-453fc2b6a9a9"),
  levis: unsplash("photo-1551958219-acbc608c6377"),
  nrg: unsplash("photo-1540552965541-2b6b307f9b6a"),
  linc: unsplash("photo-1493924191462-3e1bab2f4b56"),
  mercedes: unsplash("photo-1574629810360-7efbbe195018"),
  lumen: unsplash("photo-1431324155629-1a6deb1dec8d"),
  hardrock: unsplash("photo-1518091043644-c1d4457512c6"),
  gillette: unsplash("photo-1526232761682-d26e03ac148e"),
  bcplace: unsplash("photo-1461896836934-ffe607ba6856"),
  bbva: unsplash("photo-1579952363873-27f3bade9f55"),
  akron: unsplash("photo-1553778263-73a83bab4808"),
  bmo: unsplash("photo-1560272564-c83b66b1ad12"),
} as const;

export const STADIUM_FALLBACK = STADIUM_IMAGES.metlife;
export const HERO_IMAGE = unsplash("photo-1522778119026-d647f0596c20", 2400);
export const LOGIN_IMAGE = unsplash("photo-1459865264687-595d652de67e", 2000);
export const PLAYER_FALLBACK = unsplash("photo-1574629810360-7efbbe195018", 800);

/**
 * Real football photography per star player (Unsplash — reliable hotlink).
 * Each entry has a distinct primary + shared stadium fallback.
 */
export const PLAYER_PHOTOS = {
  messi: {
    primary: unsplash("photo-1543326727-cf6c39e8f84c", 800),
    fallback: PLAYER_FALLBACK,
  },
  ronaldo: {
    primary: unsplash("photo-1571019613454-1cb2f99b2d8b", 800),
    fallback: PLAYER_FALLBACK,
  },
  mbappe: {
    primary: unsplash("photo-1574629810360-7efbbe195018", 800),
    fallback: unsplash("photo-1518091043644-c1d4457512c6", 800),
  },
  haaland: {
    primary: unsplash("photo-1508098682722-e99c43a406b2", 800),
    fallback: PLAYER_FALLBACK,
  },
  kane: {
    primary: unsplash("photo-1518091043644-c1d4457512c6", 800),
    fallback: PLAYER_FALLBACK,
  },
  bellingham: {
    primary: unsplash("photo-1552667466-07770ae110d0", 800),
    fallback: PLAYER_FALLBACK,
  },
  vini: {
    primary: unsplash("photo-1526232761682-d26e03ac148e", 800),
    fallback: PLAYER_FALLBACK,
  },
  yamal: {
    primary: unsplash("photo-1517649763962-0c623066013b", 800),
    fallback: PLAYER_FALLBACK,
  },
  kdb: {
    primary: unsplash("photo-1431324155629-1a6deb1dec8d", 800),
    fallback: PLAYER_FALLBACK,
  },
  salah: {
    primary: unsplash("photo-1461896836934-ffe607ba6856", 800),
    fallback: PLAYER_FALLBACK,
  },
  pulisic: {
    primary: unsplash("photo-1546519638-68e109498ffc", 800),
    fallback: PLAYER_FALLBACK,
  },
  musiala: {
    primary: unsplash("photo-1526506118085-60ce8714f8c5", 800),
    fallback: PLAYER_FALLBACK,
  },
  hakimi: {
    primary: unsplash("photo-1571731956672-f2b94d7dd0cb", 800),
    fallback: PLAYER_FALLBACK,
  },
  valverde: {
    primary: unsplash("photo-1579952363873-27f3bade9f55", 800),
    fallback: PLAYER_FALLBACK,
  },
  davies: {
    primary: unsplash("photo-1560272564-c83b66b1ad12", 800),
    fallback: PLAYER_FALLBACK,
  },
  son: {
    primary: unsplash("photo-1553778263-73a83bab4808", 800),
    fallback: PLAYER_FALLBACK,
  },
} as const;
