export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED";

export interface Team {
  id: string;
  country: string;
  code: string; // ISO alpha-2 for flag CDN
  flag: string;
  coach: string;
  ranking: number;
  continent: "Europe" | "South America" | "North America" | "Africa" | "Asia" | "Oceania";
  group: string;
  squadPreview: string[];
  color: string; // brand accent for the card glow
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
  goals: number;
  assists: number;
  appearances: number;
  rating: number;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
}

export interface Match {
  id: string;
  homeCode: string;
  homeCountry: string;
  awayCode: string;
  awayCountry: string;
  stadium: string;
  city: string;
  date: string; // ISO
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  stage: string;
  group: string;
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
