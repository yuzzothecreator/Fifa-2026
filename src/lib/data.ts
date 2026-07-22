import type { Team, Player, Stadium, Match, NewsArticle } from "./types";

// FIFA World Cup 2026 — real tournament facts.
// Hosts: USA, Canada & Mexico · 48 teams · 104 matches · 16 host cities.
// Opening match: 11 June 2026, Estadio Azteca, Mexico City (Mexico).
// Final: 19 July 2026, MetLife Stadium, New York/New Jersey.
export const TOURNAMENT_START = "2026-06-11T19:00:00-05:00";
export const TOURNAMENT_FINAL = "2026-07-19T15:00:00-04:00";

// FIFA rankings & coaches below reflect the real 2025 line-up. Group letters
// are illustrative (the official 12-group, 48-team draw is represented in part).
export const teams: Team[] = [
  { id: "t-arg", country: "Argentina", code: "ar", flag: "🇦🇷", coach: "Lionel Scaloni", ranking: 1, continent: "South America", group: "A", color: "#75AADB", squadPreview: ["L. Messi", "L. Martínez", "E. Martínez", "R. De Paul"] },
  { id: "t-esp", country: "Spain", code: "es", flag: "🇪🇸", coach: "Luis de la Fuente", ranking: 2, continent: "Europe", group: "E", color: "#C60B1E", squadPreview: ["Lamine Yamal", "Pedri", "Rodri", "N. Williams"] },
  { id: "t-fra", country: "France", code: "fr", flag: "🇫🇷", coach: "Didier Deschamps", ranking: 3, continent: "Europe", group: "B", color: "#0055A4", squadPreview: ["K. Mbappé", "O. Dembélé", "M. Thuram", "W. Saliba"] },
  { id: "t-eng", country: "England", code: "gb-eng", flag: "🏴", coach: "Thomas Tuchel", ranking: 4, continent: "Europe", group: "D", color: "#CF142B", squadPreview: ["J. Bellingham", "H. Kane", "B. Saka", "P. Foden"] },
  { id: "t-bra", country: "Brazil", code: "br", flag: "🇧🇷", coach: "Carlo Ancelotti", ranking: 5, continent: "South America", group: "C", color: "#009B3A", squadPreview: ["Vinícius Jr.", "Rodrygo", "Raphinha", "Éderson"] },
  { id: "t-ned", country: "Netherlands", code: "nl", flag: "🇳🇱", coach: "Ronald Koeman", ranking: 6, continent: "Europe", group: "G", color: "#FF7F00", squadPreview: ["V. van Dijk", "C. Gakpo", "F. de Jong", "M. Depay"] },
  { id: "t-por", country: "Portugal", code: "pt", flag: "🇵🇹", coach: "Roberto Martínez", ranking: 7, continent: "Europe", group: "F", color: "#006600", squadPreview: ["C. Ronaldo", "B. Fernandes", "R. Leão", "B. Silva"] },
  { id: "t-bel", country: "Belgium", code: "be", flag: "🇧🇪", coach: "Rudi Garcia", ranking: 8, continent: "Europe", group: "B", color: "#FDDA24", squadPreview: ["K. De Bruyne", "R. Lukaku", "J. Doku", "A. Onana"] },
  { id: "t-cro", country: "Croatia", code: "hr", flag: "🇭🇷", coach: "Zlatko Dalić", ranking: 9, continent: "Europe", group: "C", color: "#FF0000", squadPreview: ["L. Modrić", "J. Gvardiol", "M. Kovačić", "A. Kramarić"] },
  { id: "t-ger", country: "Germany", code: "de", flag: "🇩🇪", coach: "Julian Nagelsmann", ranking: 10, continent: "Europe", group: "A", color: "#000000", squadPreview: ["J. Musiala", "F. Wirtz", "K. Havertz", "A. Rüdiger"] },
  { id: "t-mar", country: "Morocco", code: "ma", flag: "🇲🇦", coach: "Walid Regragui", ranking: 12, continent: "Africa", group: "E", color: "#C1272D", squadPreview: ["A. Hakimi", "B. Diaz", "Y. En-Nesyri", "S. Amrabat"] },
  { id: "t-uru", country: "Uruguay", code: "uy", flag: "🇺🇾", coach: "Marcelo Bielsa", ranking: 14, continent: "South America", group: "H", color: "#7B9EBB", squadPreview: ["F. Valverde", "D. Núñez", "R. Araújo", "N. de la Cruz"] },
  { id: "t-jpn", country: "Japan", code: "jp", flag: "🇯🇵", coach: "Hajime Moriyasu", ranking: 15, continent: "Asia", group: "G", color: "#BC002D", squadPreview: ["T. Kubo", "K. Mitoma", "W. Endō", "A. Ueda"] },
  { id: "t-usa", country: "United States", code: "us", flag: "🇺🇸", coach: "Mauricio Pochettino", ranking: 16, continent: "North America", group: "D", color: "#3C3B6E", squadPreview: ["C. Pulisic", "W. McKennie", "T. Adams", "G. Reyna"] },
  { id: "t-mex", country: "Mexico", code: "mx", flag: "🇲🇽", coach: "Javier Aguirre", ranking: 17, continent: "North America", group: "A", color: "#006847", squadPreview: ["S. Giménez", "E. Álvarez", "H. Lozano", "L. Chávez"] },
  { id: "t-can", country: "Canada", code: "ca", flag: "🇨🇦", coach: "Jesse Marsch", ranking: 30, continent: "North America", group: "F", color: "#FF0000", squadPreview: ["A. Davies", "J. David", "S. Larin", "T. Buchanan"] },
];

// The 16 real host venues of the 2026 World Cup.
const STADIUM_IMAGES = [
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1540552965541-2b6b307f9b6a?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1600&q=80",
];
const img = (i: number) => STADIUM_IMAGES[i % STADIUM_IMAGES.length];

export const stadiums: Stadium[] = [
  { id: "s-metlife", name: "MetLife Stadium", city: "New York / New Jersey", country: "USA", capacity: 82500, image: img(0) },
  { id: "s-att", name: "AT&T Stadium", city: "Dallas (Arlington)", country: "USA", capacity: 80000, image: img(3) },
  { id: "s-arrowhead", name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: 76416, image: img(1) },
  { id: "s-nrg", name: "NRG Stadium", city: "Houston", country: "USA", capacity: 72220, image: img(2) },
  { id: "s-mercedes", name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: 71000, image: img(4) },
  { id: "s-sofi", name: "SoFi Stadium", city: "Los Angeles (Inglewood)", country: "USA", capacity: 70240, image: img(5) },
  { id: "s-linc", name: "Lincoln Financial Field", city: "Philadelphia", country: "USA", capacity: 69796, image: img(1) },
  { id: "s-lumen", name: "Lumen Field", city: "Seattle", country: "USA", capacity: 68740, image: img(2) },
  { id: "s-levis", name: "Levi's Stadium", city: "San Francisco Bay Area", country: "USA", capacity: 68500, image: img(0) },
  { id: "s-gillette", name: "Gillette Stadium", city: "Boston (Foxborough)", country: "USA", capacity: 65878, image: img(3) },
  { id: "s-hardrock", name: "Hard Rock Stadium", city: "Miami", country: "USA", capacity: 65326, image: img(4) },
  { id: "s-bmo", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45500, image: img(5) },
  { id: "s-bcplace", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500, image: img(0) },
  { id: "s-azteca", name: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: 83264, image: img(2) },
  { id: "s-akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: 48071, image: img(3) },
  { id: "s-bbva", name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: 53500, image: img(4) },
];

// Player figures are real career international statistics (caps & goals for the
// national team, approximate as of 2025) plus current club and an overall rating.
export const players: Player[] = [
  { id: "p-ronaldo", name: "Cristiano Ronaldo", country: "Portugal", code: "pt", position: "FWD", club: "Al Nassr", number: 7, photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", goals: 135, assists: 45, appearances: 217, rating: 8.7 },
  { id: "p-messi", name: "Lionel Messi", country: "Argentina", code: "ar", position: "FWD", club: "Inter Miami", number: 10, photo: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80", goals: 112, assists: 58, appearances: 191, rating: 9.2 },
  { id: "p-mbappe", name: "Kylian Mbappé", country: "France", code: "fr", position: "FWD", club: "Real Madrid", number: 10, photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80", goals: 50, assists: 32, appearances: 90, rating: 9.3 },
  { id: "p-kdb", name: "Kevin De Bruyne", country: "Belgium", code: "be", position: "MID", club: "Napoli", number: 17, photo: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80", goals: 30, assists: 55, appearances: 110, rating: 8.8 },
  { id: "p-hakimi", name: "Achraf Hakimi", country: "Morocco", code: "ma", position: "DEF", club: "Paris Saint-Germain", number: 2, photo: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=800&q=80", goals: 11, assists: 18, appearances: 82, rating: 8.5 },
  { id: "p-vini", name: "Vinícius Júnior", country: "Brazil", code: "br", position: "FWD", club: "Real Madrid", number: 7, photo: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=800&q=80", goals: 6, assists: 8, appearances: 42, rating: 9.0 },
  { id: "p-bellingham", name: "Jude Bellingham", country: "England", code: "gb-eng", position: "MID", club: "Real Madrid", number: 10, photo: "https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=800&q=80", goals: 8, assists: 9, appearances: 42, rating: 9.0 },
  { id: "p-yamal", name: "Lamine Yamal", country: "Spain", code: "es", position: "FWD", club: "FC Barcelona", number: 19, photo: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80", goals: 7, assists: 11, appearances: 21, rating: 8.9 },
  { id: "p-haaland", name: "Erling Haaland", country: "Norway", code: "no", position: "FWD", club: "Manchester City", number: 9, photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", goals: 42, assists: 8, appearances: 42, rating: 9.0 },
  { id: "p-musiala", name: "Jamal Musiala", country: "Germany", code: "de", position: "MID", club: "Bayern Munich", number: 10, photo: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80", goals: 7, assists: 6, appearances: 41, rating: 8.7 },
  { id: "p-pulisic", name: "Christian Pulisic", country: "United States", code: "us", position: "FWD", club: "AC Milan", number: 10, photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80", goals: 32, assists: 21, appearances: 79, rating: 8.4 },
  { id: "p-valverde", name: "Federico Valverde", country: "Uruguay", code: "uy", position: "MID", club: "Real Madrid", number: 15, photo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80", goals: 7, assists: 10, appearances: 70, rating: 8.6 },
];

function at(dateISO: string) {
  return dateISO;
}

// Fixtures: opening match & final use the real venues/dates; group-stage
// pairings below are illustrative of the tournament format.
export const matches: Match[] = [
  { id: "m1", homeCode: "mx", homeCountry: "Mexico", awayCode: "ca", awayCountry: "Canada", stadium: "Estadio Azteca", city: "Mexico City", date: at("2026-06-11T19:00:00-05:00"), status: "LIVE", homeScore: 1, awayScore: 0, minute: 58, stage: "Group Stage · Opening Match", group: "A" },
  { id: "m2", homeCode: "us", homeCountry: "United States", awayCode: "jp", awayCountry: "Japan", stadium: "SoFi Stadium", city: "Los Angeles", date: at("2026-06-12T18:00:00-07:00"), status: "SCHEDULED", stage: "Group Stage", group: "D" },
  { id: "m3", homeCode: "ar", homeCountry: "Argentina", awayCode: "de", awayCountry: "Germany", stadium: "MetLife Stadium", city: "New York / New Jersey", date: at("2026-06-13T20:00:00-04:00"), status: "SCHEDULED", stage: "Group Stage", group: "A" },
  { id: "m4", homeCode: "es", homeCountry: "Spain", awayCode: "ma", awayCountry: "Morocco", stadium: "AT&T Stadium", city: "Dallas", date: at("2026-06-14T18:00:00-05:00"), status: "SCHEDULED", stage: "Group Stage", group: "E" },
  { id: "m5", homeCode: "br", homeCountry: "Brazil", awayCode: "hr", awayCountry: "Croatia", stadium: "Mercedes-Benz Stadium", city: "Atlanta", date: at("2026-06-15T21:00:00-04:00"), status: "SCHEDULED", stage: "Group Stage", group: "C" },
  { id: "m6", homeCode: "pt", homeCountry: "Portugal", awayCode: "ca", awayCountry: "Canada", stadium: "BMO Field", city: "Toronto", date: at("2026-06-16T19:00:00-04:00"), status: "SCHEDULED", stage: "Group Stage", group: "F" },
  { id: "m7", homeCode: "nl", homeCountry: "Netherlands", awayCode: "jp", awayCountry: "Japan", stadium: "Lumen Field", city: "Seattle", date: at("2026-06-17T18:00:00-07:00"), status: "SCHEDULED", stage: "Group Stage", group: "G" },
  { id: "m8", homeCode: "fr", homeCountry: "France", awayCode: "be", awayCountry: "Belgium", stadium: "Arrowhead Stadium", city: "Kansas City", date: at("2026-06-13T20:00:00-05:00"), status: "FINISHED", homeScore: 3, awayScore: 2, stage: "Group Stage", group: "B" },
  { id: "m9", homeCode: "uy", homeCountry: "Uruguay", awayCode: "us", awayCountry: "United States", stadium: "Hard Rock Stadium", city: "Miami", date: at("2026-06-12T21:00:00-04:00"), status: "FINISHED", homeScore: 0, awayScore: 1, stage: "Group Stage", group: "D" },
  { id: "m10", homeCode: "gb-eng", homeCountry: "England", awayCode: "mx", awayCountry: "Mexico", stadium: "NRG Stadium", city: "Houston", date: at("2026-06-18T20:00:00-05:00"), status: "SCHEDULED", stage: "Group Stage", group: "D" },
];

export const news: NewsArticle[] = [
  { id: "n1", title: "World Cup 2026 kicks off at Estadio Azteca as Mexico hosts historic opener", slug: "azteca-opener", description: "For the first time the FIFA World Cup is co-hosted by three nations — the USA, Canada and Mexico — with a record 48 teams and 104 matches.", image: STADIUM_IMAGES[2], category: "Breaking", featured: true, publishedDate: "2026-06-11T09:00:00Z", readTime: 5 },
  { id: "n2", title: "France edge Belgium 3-2 in a Kansas City classic", slug: "france-belgium-classic", description: "Les Bleus announce their arrival with a breathless attacking display at Arrowhead Stadium.", image: STADIUM_IMAGES[1], category: "Match Report", featured: true, publishedDate: "2026-06-13T22:30:00Z", readTime: 4 },
  { id: "n3", title: "Ancelotti's Brazil: inside the tactical reboot of the Seleção", slug: "ancelotti-brazil-tactics", description: "How Carlo Ancelotti has reshaped Brazil's midfield balance ahead of their opener against Croatia.", image: STADIUM_IMAGES[4], category: "Analysis", featured: false, publishedDate: "2026-06-12T14:00:00Z", readTime: 7 },
  { id: "n4", title: "48 teams, 16 cities, 104 matches: the biggest World Cup ever, explained", slug: "biggest-world-cup", description: "Everything you need to know about the expanded 2026 format across North America.", image: STADIUM_IMAGES[0], category: "Feature", featured: false, publishedDate: "2026-06-10T11:00:00Z", readTime: 6 },
  { id: "n5", title: "MetLife Stadium to host the 2026 Final on July 19", slug: "metlife-final", description: "The New York/New Jersey venue will stage the showpiece in front of 82,500 fans.", image: STADIUM_IMAGES[0], category: "Feature", featured: false, publishedDate: "2026-06-09T08:00:00Z", readTime: 3 },
  { id: "n6", title: "USMNT open on home soil chasing a knockout run", slug: "usmnt-home-run", description: "Mauricio Pochettino's side begin their campaign against Japan in Los Angeles.", image: STADIUM_IMAGES[5], category: "Match Report", featured: false, publishedDate: "2026-06-11T23:00:00Z", readTime: 4 },
];

export const tournamentStats = {
  matchesPlayed: 3,
  totalMatches: 104,
  goalsScored: 9,
  teamsQualified: 48,
  stadiums: 16,
  hostCities: 16,
  topScorer: { name: "Kylian Mbappé", goals: 3 },
};

export const flagUrl = (code: string, size: "w40" | "w80" | "w160" | "w320" = "w160") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getTeamByCode = (code: string) => teams.find((t) => t.code === code);
