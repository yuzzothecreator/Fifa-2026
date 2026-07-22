export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED";
export type Continent =
  | "Europe"
  | "South America"
  | "North America"
  | "Africa"
  | "Asia"
  | "Oceania";

export interface Team {
  id: string;
  country: string;
  code: string;
  flag: string;
  coach: string;
  ranking: number;
  continent: Continent;
  group: string;
  squadPreview: string[];
  color: string;
  titles?: number;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  code: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  club: string;
  number: number;
  photo: string;
  /** Career international goals */
  goals: number;
  /** Career international assists (approx.) */
  assists: number;
  /** Career international caps */
  appearances: number;
  /** Overall form rating */
  rating: number;
  /** Goals at FIFA World Cups (career) */
  worldCupGoals: number;
  /** Goals at FIFA World Cup 2026 so far */
  tournamentGoals: number;
  age: number;
  bio: string;
}

export interface Stadium {
  id: string;
  name: string;
  /** Common / local name */
  localName: string;
  city: string;
  country: string;
  /** Official FIFA tournament capacity */
  capacity: number;
  opened: number;
  image: string;
  matchesHosted: number;
}

export interface Match {
  id: string;
  homeCode: string;
  homeCountry: string;
  awayCode: string;
  awayCountry: string;
  stadium: string;
  city: string;
  date: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  stage: string;
  group: string;
  note?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: "Match Report" | "Transfer" | "Analysis" | "Feature" | "Breaking";
  featured: boolean;
  publishedDate: string;
  readTime: number;
}

export interface GroupStanding {
  code: string;
  country: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}
