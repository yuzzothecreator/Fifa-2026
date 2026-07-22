import type { Team, Player, Stadium, Match, NewsArticle, GroupStanding } from "./types";

// ── Real FIFA World Cup 2026 tournament facts ──────────────────────────────
// Hosts: Canada · Mexico · USA | 48 teams | 12 groups | 104 matches | 16 cities
// Opening: 11 June 2026 — Mexico vs South Africa @ Mexico City Stadium (Azteca)
// Final:   19 July 2026 — New York New Jersey Stadium (MetLife)
// Groups & results sourced from FIFA.com match schedule / official draw.

export const TOURNAMENT_START = "2026-06-11T19:00:00-06:00";
export const TOURNAMENT_FINAL = "2026-07-19T15:00:00-04:00";

const wiki = (path: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/${path}`;

// ── Stadiums — FIFA confirmed tournament capacities (Inside FIFA, 2026) ────
export const stadiums: Stadium[] = [
  { id: "s-azteca", name: "Mexico City Stadium", localName: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: 80824, opened: 1966, matchesHosted: 5, image: wiki("thumb/1/1d/Estadio_Azteca_01.jpg/1280px-Estadio_Azteca_01.jpg") },
  { id: "s-metlife", name: "New York New Jersey Stadium", localName: "MetLife Stadium", city: "East Rutherford, NJ", country: "USA", capacity: 80663, opened: 2010, matchesHosted: 8, image: wiki("thumb/0/04/MetLife_Stadium_panorama.jpg/1280px-MetLife_Stadium_panorama.jpg") },
  { id: "s-att", name: "Dallas Stadium", localName: "AT&T Stadium", city: "Arlington, TX", country: "USA", capacity: 70649, opened: 2009, matchesHosted: 7, image: wiki("thumb/1/10/Cowboys_Stadium_Exterior.jpg/1280px-Cowboys_Stadium_Exterior.jpg") },
  { id: "s-sofi", name: "Los Angeles Stadium", localName: "SoFi Stadium", city: "Inglewood, CA", country: "USA", capacity: 70492, opened: 2020, matchesHosted: 7, image: wiki("thumb/2/20/SoFi_Stadium_2021.jpg/1280px-SoFi_Stadium_2021.jpg") },
  { id: "s-arrowhead", name: "Kansas City Stadium", localName: "Arrowhead Stadium", city: "Kansas City, MO", country: "USA", capacity: 69045, opened: 1972, matchesHosted: 6, image: wiki("thumb/0/0c/Arrowhead_Stadium_2010.jpg/1280px-Arrowhead_Stadium_2010.jpg") },
  { id: "s-levis", name: "San Francisco Bay Area Stadium", localName: "Levi's Stadium", city: "Santa Clara, CA", country: "USA", capacity: 68827, opened: 2014, matchesHosted: 6, image: wiki("thumb/5/5c/Levi%27s_Stadium_aerial_view.jpg/1280px-Levi%27s_Stadium_aerial_view.jpg") },
  { id: "s-nrg", name: "Houston Stadium", localName: "NRG Stadium", city: "Houston, TX", country: "USA", capacity: 68777, opened: 2002, matchesHosted: 7, image: wiki("thumb/5/5a/Reliant_Stadium.jpg/1280px-Reliant_Stadium.jpg") },
  { id: "s-linc", name: "Philadelphia Stadium", localName: "Lincoln Financial Field", city: "Philadelphia, PA", country: "USA", capacity: 68324, opened: 2003, matchesHosted: 6, image: wiki("thumb/9/9e/Lincoln_Financial_Field_2013.jpg/1280px-Lincoln_Financial_Field_2013.jpg") },
  { id: "s-mercedes", name: "Atlanta Stadium", localName: "Mercedes-Benz Stadium", city: "Atlanta, GA", country: "USA", capacity: 68239, opened: 2017, matchesHosted: 7, image: wiki("thumb/0/03/Mercedes-Benz_Stadium_%28cropped%29.jpg/1280px-Mercedes-Benz_Stadium_%28cropped%29.jpg") },
  { id: "s-lumen", name: "Seattle Stadium", localName: "Lumen Field", city: "Seattle, WA", country: "USA", capacity: 66925, opened: 2002, matchesHosted: 6, image: wiki("thumb/7/70/CenturyLink_Field_%28formerly_Qwest_Field%29.jpg/1280px-CenturyLink_Field_%28formerly_Qwest_Field%29.jpg") },
  { id: "s-hardrock", name: "Miami Stadium", localName: "Hard Rock Stadium", city: "Miami Gardens, FL", country: "USA", capacity: 64478, opened: 1987, matchesHosted: 6, image: wiki("thumb/8/8c/Hard_Rock_Stadium.jpg/1280px-Hard_Rock_Stadium.jpg") },
  { id: "s-gillette", name: "Boston Stadium", localName: "Gillette Stadium", city: "Foxborough, MA", country: "USA", capacity: 64146, opened: 2002, matchesHosted: 6, image: wiki("thumb/d/d5/Gillette_Stadium02.jpg/1280px-Gillette_Stadium02.jpg") },
  { id: "s-bcplace", name: "BC Place Vancouver", localName: "BC Place", city: "Vancouver, BC", country: "Canada", capacity: 52497, opened: 1983, matchesHosted: 5, image: wiki("thumb/8/8a/BC_Place_2015_Canada_vs_Jamaica.jpg/1280px-BC_Place_2015_Canada_vs_Jamaica.jpg") },
  { id: "s-bbva", name: "Monterrey Stadium", localName: "Estadio BBVA", city: "Guadalupe, NL", country: "Mexico", capacity: 51243, opened: 2015, matchesHosted: 4, image: wiki("thumb/9/95/Estadio_BBVA_Bancomer.jpg/1280px-Estadio_BBVA_Bancomer.jpg") },
  { id: "s-akron", name: "Guadalajara Stadium", localName: "Estadio Akron", city: "Zapopan, Jalisco", country: "Mexico", capacity: 45664, opened: 2010, matchesHosted: 4, image: wiki("thumb/4/4e/Estadio_Omnilife.jpg/1280px-Estadio_Omnilife.jpg") },
  { id: "s-bmo", name: "Toronto Stadium", localName: "BMO Field", city: "Toronto, ON", country: "Canada", capacity: 43036, opened: 2007, matchesHosted: 5, image: wiki("thumb/7/74/BMO_Field_2016.jpg/1280px-BMO_Field_2016.jpg") },
];

// Fallback stadium photo if a Wikimedia file 404s
export const STADIUM_FALLBACK =
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80";

// ── All 48 teams — official Final Draw groups ──────────────────────────────
function t(
  id: string,
  country: string,
  code: string,
  flag: string,
  coach: string,
  ranking: number,
  continent: Team["continent"],
  group: string,
  color: string,
  squad: string[],
  titles = 0
): Team {
  return { id, country, code, flag, coach, ranking, continent, group, color, squadPreview: squad, titles };
}

export const teams: Team[] = [
  // Group A
  t("t-mex", "Mexico", "mx", "🇲🇽", "Javier Aguirre", 17, "North America", "A", "#006847", ["S. Giménez", "E. Álvarez", "H. Lozano", "L. Chávez"]),
  t("t-zaf", "South Africa", "za", "🇿🇦", "Hugo Broos", 60, "Africa", "A", "#007A4D", ["P. Mokoena", "T. Mokoena", "P. Tau", "T. Morena"]),
  t("t-kor", "Korea Republic", "kr", "🇰🇷", "Hong Myung-bo", 22, "Asia", "A", "#0047A0", ["Son Heung-min", "Lee Kang-in", "Kim Min-jae", "Hwang Hee-chan"]),
  t("t-cze", "Czechia", "cz", "🇨🇿", "Ivan Hašek", 31, "Europe", "A", "#11457E", ["P. Schick", "T. Souček", "V. Coufal", "L. Provod"]),
  // Group B
  t("t-can", "Canada", "ca", "🇨🇦", "Jesse Marsch", 38, "North America", "B", "#FF0000", ["A. Davies", "J. David", "S. Adekugbe", "T. Buchanan"]),
  t("t-bih", "Bosnia and Herzegovina", "ba", "🇧🇦", "Sergej Barbarez", 64, "Europe", "B", "#002395", ["E. Džeko", "A. Pjanic", "E. Demirović", "N. Hadžiahmetović"]),
  t("t-qat", "Qatar", "qa", "🇶🇦", "Julen Lopetegui", 35, "Asia", "B", "#8A1538", ["A. Almoez", "A. Hassan", "B. Bounedjah", "A. Madibo"]),
  t("t-sui", "Switzerland", "ch", "🇨🇭", "Murat Yakin", 20, "Europe", "B", "#FF0000", ["X. Shaqiri", "G. Xhaka", "B. Embolo", "M. Akanji"]),
  // Group C
  t("t-bra", "Brazil", "br", "🇧🇷", "Carlo Ancelotti", 5, "South America", "C", "#009B3A", ["Vinícius Jr.", "Rodrygo", "Raphinha", "Éderson"], 5),
  t("t-mar", "Morocco", "ma", "🇲🇦", "Walid Regragui", 12, "Africa", "C", "#C1272D", ["A. Hakimi", "B. Diaz", "Y. En-Nesyri", "S. Amrabat"]),
  t("t-hai", "Haiti", "ht", "🇭🇹", "Sébastien Migné", 86, "North America", "C", "#00209F", ["D. Nazon", "F. Pierrot", "L. Alcéus", "J. Décius"]),
  t("t-sco", "Scotland", "gb-sct", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Steve Clarke", 42, "Europe", "C", "#0065BF", ["A. Robertson", "S. McTominay", "J. McGinn", "C. Adams"]),
  // Group D
  t("t-usa", "United States", "us", "🇺🇸", "Mauricio Pochettino", 16, "North America", "D", "#3C3B6E", ["C. Pulisic", "W. McKennie", "T. Weah", "G. Reyna"]),
  t("t-par", "Paraguay", "py", "🇵🇾", "Gustavo Alfaro", 48, "South America", "D", "#0038A8", ["M. Almirón", "A. Sanabria", "J. Enciso", "G. Gómez"]),
  t("t-aus", "Australia", "au", "🇦🇺", "Tony Popovic", 24, "Asia", "D", "#012169", ["M. Boyle", "J. Irvine", "H. Souttar", "A. Goodwin"]),
  t("t-tur", "Türkiye", "tr", "🇹🇷", "Vincenzo Montella", 26, "Europe", "D", "#E30A17", ["H. Çalhanoğlu", "K. Aktürkoğlu", "A. Güler", "U. Çakır"]),
  // Group E
  t("t-ger", "Germany", "de", "🇩🇪", "Julian Nagelsmann", 10, "Europe", "E", "#000000", ["J. Musiala", "F. Wirtz", "K. Havertz", "A. Rüdiger"], 4),
  t("t-cuw", "Curaçao", "cw", "🇨🇼", "Dick Advocaat", 82, "North America", "E", "#002B7F", ["J. Bacuna", "L. Bacuna", "R. Anita", "G. Roemeratoe"]),
  t("t-civ", "Côte d'Ivoire", "ci", "🇨🇮", "Emerse Faé", 45, "Africa", "E", "#F77F00", ["S. Haller", "N. Pépé", "W. Fofana", "F. Kessié"]),
  t("t-ecu", "Ecuador", "ec", "🇪🇨", "Sebastián Beccacece", 28, "South America", "E", "#FFD100", ["M. Caicedo", "E. Valencia", "P. Estupiñán", "K. Páez"]),
  // Group F
  t("t-ned", "Netherlands", "nl", "🇳🇱", "Ronald Koeman", 7, "Europe", "F", "#FF7F00", ["V. van Dijk", "C. Gakpo", "F. de Jong", "X. Simons"]),
  t("t-jpn", "Japan", "jp", "🇯🇵", "Hajime Moriyasu", 18, "Asia", "F", "#BC002D", ["T. Kubo", "K. Mitoma", "W. Endō", "A. Ueda"]),
  t("t-swe", "Sweden", "se", "🇸🇪", "Jon Dahl Tomasson", 25, "Europe", "F", "#006AA7", ["A. Isak", "V. Gyökeres", "D. Kulusevski", "E. Forsberg"]),
  t("t-tun", "Tunisia", "tn", "🇹🇳", "Sami Trabelsi", 41, "Africa", "F", "#E70013", ["Y. Msakni", "H. Rafia", "A. Abdi", "M. Ben Romdhane"]),
  // Group G
  t("t-bel", "Belgium", "be", "🇧🇪", "Rudi Garcia", 8, "Europe", "G", "#FDDA24", ["K. De Bruyne", "R. Lukaku", "J. Doku", "C. De Ketelaere"]),
  t("t-egy", "Egypt", "eg", "🇪🇬", "Hossam Hassan", 33, "Africa", "G", "#CE1126", ["M. Salah", "O. Marmoush", "T. Hamed", "M. Elneny"]),
  t("t-irn", "IR Iran", "ir", "🇮🇷", "Amir Ghalenoei", 21, "Asia", "G", "#239F40", ["M. Taremi", "S. Azmoun", "A. Gholizadeh", "A. Beiranvand"]),
  t("t-nzl", "New Zealand", "nz", "🇳🇿", "Darren Bazeley", 103, "Oceania", "G", "#00247D", ["C. Wood", "M. Boxall", "L. Singh", "W. Just"]),
  // Group H
  t("t-esp", "Spain", "es", "🇪🇸", "Luis de la Fuente", 2, "Europe", "H", "#C60B1E", ["Lamine Yamal", "Pedri", "Rodri", "N. Williams"], 1),
  t("t-cpv", "Cabo Verde", "cv", "🇨🇻", "Bubista", 71, "Africa", "H", "#003893", ["Bebé", "R. Mendes", "W. Semedo", "Vozinha"]),
  t("t-ksa", "Saudi Arabia", "sa", "🇸🇦", "Hervé Renard", 56, "Asia", "H", "#006C35", ["S. Al-Dawsari", "F. Al-Buraikan", "A. Al-Shehri", "M. Al-Owais"]),
  t("t-uru", "Uruguay", "uy", "🇺🇾", "Marcelo Bielsa", 14, "South America", "H", "#7B9EBB", ["F. Valverde", "D. Núñez", "R. Araújo", "N. de la Cruz"], 2),
  // Group I
  t("t-fra", "France", "fr", "🇫🇷", "Didier Deschamps", 3, "Europe", "I", "#0055A4", ["K. Mbappé", "O. Dembélé", "A. Tchouaméni", "W. Saliba"], 2),
  t("t-sen", "Senegal", "sn", "🇸🇳", "Pape Thiaw", 19, "Africa", "I", "#00853F", ["I. Sarr", "N. Mendy", "K. Koulibaly", "É. Mendy"]),
  t("t-irq", "Iraq", "iq", "🇮🇶", "Jesús Casas", 55, "Asia", "I", "#000000", ["A. Hussein", "I. Bayesh", "A. Alaa", "J. Attwan"]),
  t("t-nor", "Norway", "no", "🇳🇴", "Ståle Solbakken", 44, "Europe", "I", "#BA0C2F", ["E. Haaland", "M. Ødegaard", "A. Sørloth", "S. Østigård"]),
  // Group J
  t("t-arg", "Argentina", "ar", "🇦🇷", "Lionel Scaloni", 1, "South America", "J", "#75AADB", ["L. Messi", "L. Martínez", "E. Fernández", "R. De Paul"], 3),
  t("t-alg", "Algeria", "dz", "🇩🇿", "Vladimir Petković", 30, "Africa", "J", "#006633", ["R. Mahrez", "I. Bennacer", "B. Brahimi", "H. Mandi"]),
  t("t-aut", "Austria", "at", "🇦🇹", "Ralf Rangnick", 23, "Europe", "J", "#ED2939", ["M. Sabitzer", "C. Baumgartner", "K. Danso", "P. Wimmer"]),
  t("t-jor", "Jordan", "jo", "🇯🇴", "Jamal Sellami", 70, "Asia", "J", "#007A3D", ["Y. Al-Rawashdeh", "M. Olwan", "A. Al-Mardi", "N. Al-Rawabdeh"]),
  // Group K
  t("t-por", "Portugal", "pt", "🇵🇹", "Roberto Martínez", 6, "Europe", "K", "#006600", ["C. Ronaldo", "B. Fernandes", "R. Leão", "Rúben Dias"], 0),
  t("t-cod", "Congo DR", "cd", "🇨🇩", "Sébastien Desabre", 54, "Africa", "K", "#007FFF", ["C. Banza", "Y. Wissa", "C. Mbemba", "M. Elia"]),
  t("t-uzb", "Uzbekistan", "uz", "🇺🇿", "Timur Kapadze", 50, "Asia", "K", "#1EB53A", ["E. Shomurodov", "O. Urunov", "A. Fayzullaev", "H. Erkinov"]),
  t("t-col", "Colombia", "co", "🇨🇴", "Néstor Lorenzo", 13, "South America", "K", "#FCD116", ["L. Díaz", "J. Rodríguez", "J. Arias", "D. Córdoba"]),
  // Group L
  t("t-eng", "England", "gb-eng", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Thomas Tuchel", 4, "Europe", "L", "#CF142B", ["J. Bellingham", "H. Kane", "B. Saka", "P. Foden"], 1),
  t("t-cro", "Croatia", "hr", "🇭🇷", "Zlatko Dalić", 9, "Europe", "L", "#FF0000", ["L. Modrić", "J. Gvardiol", "M. Pašalić", "A. Kramarić"]),
  t("t-gha", "Ghana", "gh", "🇬🇭", "Otto Addo", 61, "Africa", "L", "#006B3F", ["M. Kudus", "J. Ayew", "T. Partey", "I. Baba"]),
  t("t-pan", "Panama", "pa", "🇵🇦", "Thomas Christiansen", 43, "North America", "L", "#005293", ["A. Carrasquilla", "J. Fajardo", "E. Davis", "C. Waterman"]),
];

// ── Players — real career international + 2026 tournament stats ────────────
const p = (
  id: string,
  name: string,
  country: string,
  code: string,
  position: Player["position"],
  club: string,
  number: number,
  photo: string,
  goals: number,
  assists: number,
  appearances: number,
  rating: number,
  worldCupGoals: number,
  tournamentGoals: number,
  age: number,
  bio: string
): Player => ({
  id, name, country, code, position, club, number, photo,
  goals, assists, appearances, rating, worldCupGoals, tournamentGoals, age, bio,
});

export const players: Player[] = [
  p("p-messi", "Lionel Messi", "Argentina", "ar", "FWD", "Inter Miami", 10,
    wiki("thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/440px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"),
    123, 58, 202, 9.4, 21, 8, 39,
    "Eight-time Ballon d'Or winner and 2022 World Cup champion. All-time World Cup top scorer (21). Led Argentina with 8 goals at WC 2026."),
  p("p-ronaldo", "Cristiano Ronaldo", "Portugal", "pt", "FWD", "Al Nassr", 7,
    wiki("thumb/8/8c/Cristiano_Ronaldo_2018.jpg/440px-Cristiano_Ronaldo_2018.jpg"),
    146, 45, 230, 8.8, 11, 3, 41,
    "Men's all-time international top scorer (146) and most-capped active player (230). First player to score at six World Cups (2026)."),
  p("p-mbappe", "Kylian Mbappé", "France", "fr", "FWD", "Real Madrid", 10,
    wiki("thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg/440px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg"),
    60, 40, 100, 9.3, 20, 8, 27,
    "2022 Golden Boot winner. Fastest to 20 World Cup goals. Tied Messi on 8 goals at WC 2026; 60 goals in first 100 France caps."),
  p("p-haaland", "Erling Haaland", "Norway", "no", "FWD", "Manchester City", 9,
    wiki("thumb/6/6e/Erling_Haaland_2023_%28cropped%29.jpg/440px-Erling_Haaland_2023_%28cropped%29.jpg"),
    42, 8, 42, 9.1, 7, 7, 25,
    "Premier League scoring machine making his World Cup debut for Norway. 7 tournament goals put him 3rd in the Golden Boot race."),
  p("p-kane", "Harry Kane", "England", "gb-eng", "FWD", "Bayern Munich", 9,
    wiki("thumb/2/2e/Harry_Kane_2023.jpg/440px-Harry_Kane_2023.jpg"),
    71, 20, 105, 8.9, 13, 6, 32,
    "England's all-time top scorer. 6 goals at WC 2026 (incl. penalties). Third on all-time World Cup goals list among active players."),
  p("p-bellingham", "Jude Bellingham", "England", "gb-eng", "MID", "Real Madrid", 10,
    wiki("thumb/8/8a/Jude_Bellingham_2024.jpg/440px-Jude_Bellingham_2024.jpg"),
    8, 9, 42, 9.0, 4, 4, 22,
    "Box-to-box midfielder and Real Madrid star. 4 goals at WC 2026 — England's creative heartbeat under Tuchel."),
  p("p-vini", "Vinícius Júnior", "Brazil", "br", "FWD", "Real Madrid", 7,
    wiki("thumb/f/f5/Vinicius_Junior_2024.jpg/440px-Vinicius_Junior_2024.jpg"),
    6, 8, 42, 9.0, 4, 4, 25,
    "Brazil's primary attacking threat under Ancelotti. 4 goals in the tournament including the Round of 32 winner vs Japan."),
  p("p-yamal", "Lamine Yamal", "Spain", "es", "FWD", "FC Barcelona", 19,
    wiki("thumb/9/9e/Lamine_Yamal_%28cropped%29.jpg/440px-Lamine_Yamal_%28cropped%29.jpg"),
    7, 11, 21, 8.9, 2, 2, 18,
    "Euro 2024 breakout star. Spain's youngest World Cup starter — elite dribbling and chance creation from the right."),
  p("p-kdb", "Kevin De Bruyne", "Belgium", "be", "MID", "Napoli", 7,
    wiki("thumb/4/40/Kevin_De_Bruyne_201807071.jpg/440px-Kevin_De_Bruyne_201807071.jpg"),
    30, 55, 110, 8.8, 2, 1, 34,
    "Elite playmaker still driving Belgium's attack. Career 55+ international assists; key in Belgium's Round of 32 win over Senegal."),
  p("p-salah", "Mohamed Salah", "Egypt", "eg", "FWD", "Liverpool", 10,
    wiki("thumb/c/c1/Mohamed_Salah_2018.jpg/440px-Mohamed_Salah_2018.jpg"),
    57, 28, 105, 8.7, 3, 2, 33,
    "Egypt captain and Premier League icon. Led Egypt into the Round of 16 via penalties against Australia."),
  p("p-pulisic", "Christian Pulisic", "United States", "us", "FWD", "AC Milan", 10,
    wiki("thumb/6/6a/Christian_Pulisic_2019.jpg/440px-Christian_Pulisic_2019.jpg"),
    32, 21, 79, 8.4, 3, 2, 27,
    "USMNT captain. Scored in the hosts' 4-1 opener vs Paraguay and helped USA reach the knockout rounds on home soil."),
  p("p-musiala", "Jamal Musiala", "Germany", "de", "MID", "Bayern Munich", 10,
    wiki("thumb/9/93/Jamal_Musiala_2022.jpg/440px-Jamal_Musiala_2022.jpg"),
    7, 6, 41, 8.7, 2, 2, 23,
    "Germany's technical midfielder. Part of the 7-1 demolition of Curaçao — Germany's biggest World Cup win since 2002."),
  p("p-hakimi", "Achraf Hakimi", "Morocco", "ma", "DEF", "Paris Saint-Germain", 2,
    wiki("thumb/5/5c/Achraf_Hakimi.jpg/440px-Achraf_Hakimi.jpg"),
    11, 18, 82, 8.5, 1, 1, 27,
    "Attacking full-back and Morocco vice-captain. Morocco beat Canada 3-0 in the Round of 16 after topping Group C with Brazil."),
  p("p-valverde", "Federico Valverde", "Uruguay", "uy", "MID", "Real Madrid", 15,
    wiki("thumb/8/8f/Federico_Valverde_2022.jpg/440px-Federico_Valverde_2022.jpg"),
    7, 10, 70, 8.6, 1, 1, 27,
    "Uruguay's midfield engine. Relentless box-to-box presence as La Celeste pushed Spain in Group H."),
  p("p-davies", "Alphonso Davies", "Canada", "ca", "DEF", "Bayern Munich", 19,
    wiki("thumb/8/85/Alphonso_Davies_2021.jpg/440px-Alphonso_Davies_2021.jpg"),
    15, 14, 55, 8.3, 1, 1, 25,
    "Canada's world-class left-back. Set the tone for Canada's historic 6-0 win over Qatar in Vancouver."),
  p("p-son", "Son Heung-min", "Korea Republic", "kr", "FWD", "Tottenham Hotspur", 7,
    wiki("thumb/c/c0/Son_Heung-min_2023.jpg/440px-Son_Heung-min_2023.jpg"),
    48, 20, 130, 8.4, 3, 1, 33,
    "Korea captain and Asian football icon. Scored in the 2-1 opening win over Czechia in Guadalajara."),
];

const PLAYER_FALLBACK =
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80";

export const playerPhotoFallback = PLAYER_FALLBACK;

// ── Fixtures — real FIFA results (group stage + verified knockouts) ────────
function m(
  id: string,
  homeCode: string,
  homeCountry: string,
  awayCode: string,
  awayCountry: string,
  stadium: string,
  city: string,
  date: string,
  status: Match["status"],
  stage: string,
  group: string,
  homeScore?: number,
  awayScore?: number,
  note?: string
): Match {
  return {
    id, homeCode, homeCountry, awayCode, awayCountry, stadium, city, date,
    status, stage, group, homeScore, awayScore, note,
    minute: status === "LIVE" ? 67 : undefined,
  };
}

export const matches: Match[] = [
  // Matchday 1 — 11 June
  m("m01", "mx", "Mexico", "za", "South Africa", "Mexico City Stadium", "Mexico City", "2026-06-11T19:00:00-06:00", "FINISHED", "Group Stage · Opening Match", "A", 2, 0, "Opening match of WC 2026"),
  m("m02", "kr", "Korea Republic", "cz", "Czechia", "Guadalajara Stadium", "Zapopan", "2026-06-11T16:00:00-06:00", "FINISHED", "Group Stage", "A", 2, 1),
  // Matchday 2 — 12 June
  m("m03", "ca", "Canada", "ba", "Bosnia and Herzegovina", "Toronto Stadium", "Toronto", "2026-06-12T15:00:00-04:00", "FINISHED", "Group Stage", "B", 1, 1),
  m("m04", "us", "United States", "py", "Paraguay", "Los Angeles Stadium", "Inglewood", "2026-06-12T18:00:00-07:00", "FINISHED", "Group Stage", "D", 4, 1),
  // Matchday 3 — 13 June
  m("m05", "ht", "Haiti", "gb-sct", "Scotland", "Boston Stadium", "Foxborough", "2026-06-13T13:00:00-04:00", "FINISHED", "Group Stage", "C", 0, 1),
  m("m06", "au", "Australia", "tr", "Türkiye", "BC Place Vancouver", "Vancouver", "2026-06-13T16:00:00-07:00", "FINISHED", "Group Stage", "D", 2, 0),
  m("m07", "br", "Brazil", "ma", "Morocco", "New York New Jersey Stadium", "East Rutherford", "2026-06-13T20:00:00-04:00", "FINISHED", "Group Stage", "C", 1, 1),
  m("m08", "qa", "Qatar", "ch", "Switzerland", "San Francisco Bay Area Stadium", "Santa Clara", "2026-06-13T17:00:00-07:00", "FINISHED", "Group Stage", "B", 1, 1),
  // Matchday 4 — 14 June
  m("m09", "ci", "Côte d'Ivoire", "ec", "Ecuador", "Philadelphia Stadium", "Philadelphia", "2026-06-14T15:00:00-04:00", "FINISHED", "Group Stage", "E", 1, 0),
  m("m10", "de", "Germany", "cw", "Curaçao", "Houston Stadium", "Houston", "2026-06-14T18:00:00-05:00", "FINISHED", "Group Stage", "E", 7, 1, "Germany's biggest WC win since 2002"),
  m("m11", "nl", "Netherlands", "jp", "Japan", "Dallas Stadium", "Arlington", "2026-06-14T20:00:00-05:00", "FINISHED", "Group Stage", "F", 2, 2),
  m("m12", "se", "Sweden", "tn", "Tunisia", "Monterrey Stadium", "Guadalupe", "2026-06-14T15:00:00-06:00", "FINISHED", "Group Stage", "F", 5, 1),
  // Matchday 5 — 15 June
  m("m13", "sa", "Saudi Arabia", "uy", "Uruguay", "Miami Stadium", "Miami Gardens", "2026-06-15T15:00:00-04:00", "FINISHED", "Group Stage", "H", 1, 1),
  m("m14", "es", "Spain", "cv", "Cabo Verde", "Atlanta Stadium", "Atlanta", "2026-06-15T18:00:00-04:00", "FINISHED", "Group Stage", "H", 0, 0),
  m("m15", "ir", "IR Iran", "nz", "New Zealand", "Los Angeles Stadium", "Inglewood", "2026-06-15T13:00:00-07:00", "FINISHED", "Group Stage", "G", 2, 2),
  m("m16", "be", "Belgium", "eg", "Egypt", "Seattle Stadium", "Seattle", "2026-06-15T17:00:00-07:00", "FINISHED", "Group Stage", "G", 1, 1),
  // Matchday 6 — 16 June
  m("m17", "fr", "France", "sn", "Senegal", "New York New Jersey Stadium", "East Rutherford", "2026-06-16T20:00:00-04:00", "FINISHED", "Group Stage", "I", 3, 1),
  m("m18", "iq", "Iraq", "no", "Norway", "Boston Stadium", "Foxborough", "2026-06-16T13:00:00-04:00", "FINISHED", "Group Stage", "I", 1, 4),
  m("m19", "ar", "Argentina", "dz", "Algeria", "Kansas City Stadium", "Kansas City", "2026-06-16T18:00:00-05:00", "FINISHED", "Group Stage", "J", 3, 0, "Messi tournament history moment"),
  m("m20", "at", "Austria", "jo", "Jordan", "San Francisco Bay Area Stadium", "Santa Clara", "2026-06-16T14:00:00-07:00", "FINISHED", "Group Stage", "J", 3, 1),
  // Matchday 7 — 17 June
  m("m21", "gh", "Ghana", "pa", "Panama", "Toronto Stadium", "Toronto", "2026-06-17T15:00:00-04:00", "FINISHED", "Group Stage", "L", 1, 0),
  m("m22", "gb-eng", "England", "hr", "Croatia", "Dallas Stadium", "Arlington", "2026-06-17T20:00:00-05:00", "FINISHED", "Group Stage", "L", 4, 2),
  m("m23", "pt", "Portugal", "cd", "Congo DR", "Houston Stadium", "Houston", "2026-06-17T17:00:00-05:00", "FINISHED", "Group Stage", "K", 1, 1),
  m("m24", "uz", "Uzbekistan", "co", "Colombia", "Mexico City Stadium", "Mexico City", "2026-06-17T19:00:00-06:00", "FINISHED", "Group Stage", "K", 1, 3),
  // Matchday 8 — 18 June
  m("m25", "cz", "Czechia", "za", "South Africa", "Atlanta Stadium", "Atlanta", "2026-06-18T15:00:00-04:00", "FINISHED", "Group Stage", "A", 1, 1),
  m("m26", "ch", "Switzerland", "ba", "Bosnia and Herzegovina", "Los Angeles Stadium", "Inglewood", "2026-06-18T13:00:00-07:00", "FINISHED", "Group Stage", "B", 4, 1),
  m("m27", "ca", "Canada", "qa", "Qatar", "BC Place Vancouver", "Vancouver", "2026-06-18T16:00:00-07:00", "FINISHED", "Group Stage", "B", 6, 0, "Canada's biggest World Cup win"),
  m("m28", "mx", "Mexico", "kr", "Korea Republic", "Guadalajara Stadium", "Zapopan", "2026-06-18T19:00:00-06:00", "FINISHED", "Group Stage", "A", 1, 0),
  // Matchday 9 — 19 June
  m("m29", "br", "Brazil", "ht", "Haiti", "Philadelphia Stadium", "Philadelphia", "2026-06-19T15:00:00-04:00", "FINISHED", "Group Stage", "C", 3, 0),
  m("m30", "gb-sct", "Scotland", "ma", "Morocco", "Boston Stadium", "Foxborough", "2026-06-19T18:00:00-04:00", "FINISHED", "Group Stage", "C", 0, 1),
  m("m31", "tr", "Türkiye", "py", "Paraguay", "San Francisco Bay Area Stadium", "Santa Clara", "2026-06-19T14:00:00-07:00", "FINISHED", "Group Stage", "D", 0, 1),
  m("m32", "us", "United States", "au", "Australia", "Seattle Stadium", "Seattle", "2026-06-19T17:00:00-07:00", "FINISHED", "Group Stage", "D", 2, 0),
  // Matchday 10 — 20 June
  m("m33", "de", "Germany", "ci", "Côte d'Ivoire", "Toronto Stadium", "Toronto", "2026-06-20T15:00:00-04:00", "FINISHED", "Group Stage", "E", 2, 1),
  m("m34", "ec", "Ecuador", "cw", "Curaçao", "Kansas City Stadium", "Kansas City", "2026-06-20T18:00:00-05:00", "FINISHED", "Group Stage", "E", 0, 0),
  m("m35", "nl", "Netherlands", "se", "Sweden", "Houston Stadium", "Houston", "2026-06-20T20:00:00-05:00", "FINISHED", "Group Stage", "F", 5, 1),
  m("m36", "tn", "Tunisia", "jp", "Japan", "Monterrey Stadium", "Guadalupe", "2026-06-20T15:00:00-06:00", "FINISHED", "Group Stage", "F", 0, 4),
  // Matchday 11 — 21 June
  m("m37", "uy", "Uruguay", "cv", "Cabo Verde", "Miami Stadium", "Miami Gardens", "2026-06-21T15:00:00-04:00", "FINISHED", "Group Stage", "H", 2, 2),
  m("m38", "es", "Spain", "sa", "Saudi Arabia", "Atlanta Stadium", "Atlanta", "2026-06-21T18:00:00-04:00", "FINISHED", "Group Stage", "H", 4, 0),
  m("m39", "be", "Belgium", "ir", "IR Iran", "Los Angeles Stadium", "Inglewood", "2026-06-21T13:00:00-07:00", "FINISHED", "Group Stage", "G", 0, 0),
  m("m40", "nz", "New Zealand", "eg", "Egypt", "BC Place Vancouver", "Vancouver", "2026-06-21T16:00:00-07:00", "FINISHED", "Group Stage", "G", 1, 3),
  // Matchday 12 — 22 June
  m("m41", "no", "Norway", "sn", "Senegal", "New York New Jersey Stadium", "East Rutherford", "2026-06-22T20:00:00-04:00", "FINISHED", "Group Stage", "I", 3, 2),
  m("m42", "fr", "France", "iq", "Iraq", "Philadelphia Stadium", "Philadelphia", "2026-06-22T15:00:00-04:00", "FINISHED", "Group Stage", "I", 3, 0, "Mbappé's 100th France cap (2 goals)"),
  m("m43", "ar", "Argentina", "at", "Austria", "Dallas Stadium", "Arlington", "2026-06-22T20:00:00-05:00", "FINISHED", "Group Stage", "J", 2, 0),
  m("m44", "jo", "Jordan", "dz", "Algeria", "San Francisco Bay Area Stadium", "Santa Clara", "2026-06-22T14:00:00-07:00", "FINISHED", "Group Stage", "J", 1, 2),
  // Matchday 13 — 23 June
  m("m45", "gb-eng", "England", "gh", "Ghana", "Boston Stadium", "Foxborough", "2026-06-23T18:00:00-04:00", "FINISHED", "Group Stage", "L", 0, 0),
  m("m46", "pa", "Panama", "hr", "Croatia", "Toronto Stadium", "Toronto", "2026-06-23T15:00:00-04:00", "FINISHED", "Group Stage", "L", 0, 1),
  m("m47", "pt", "Portugal", "uz", "Uzbekistan", "Houston Stadium", "Houston", "2026-06-23T17:00:00-05:00", "FINISHED", "Group Stage", "K", 5, 0, "Ronaldo scores at a 6th World Cup"),
  m("m48", "co", "Colombia", "cd", "Congo DR", "Guadalajara Stadium", "Zapopan", "2026-06-23T19:00:00-06:00", "FINISHED", "Group Stage", "K", 1, 0),
  // Matchday 14 — 24 June (Groups A–C close)
  m("m49", "gb-sct", "Scotland", "br", "Brazil", "Miami Stadium", "Miami Gardens", "2026-06-24T15:00:00-04:00", "FINISHED", "Group Stage", "C", 0, 3, "Neymar emotional return"),
  m("m50", "ma", "Morocco", "ht", "Haiti", "Atlanta Stadium", "Atlanta", "2026-06-24T18:00:00-04:00", "FINISHED", "Group Stage", "C", 4, 2),
  m("m51", "ch", "Switzerland", "ca", "Canada", "BC Place Vancouver", "Vancouver", "2026-06-24T16:00:00-07:00", "FINISHED", "Group Stage", "B", 2, 1),
  m("m52", "ba", "Bosnia and Herzegovina", "qa", "Qatar", "Seattle Stadium", "Seattle", "2026-06-24T13:00:00-07:00", "FINISHED", "Group Stage", "B", 3, 1),
  m("m53", "cz", "Czechia", "mx", "Mexico", "Mexico City Stadium", "Mexico City", "2026-06-24T19:00:00-06:00", "FINISHED", "Group Stage", "A", 0, 3),
  m("m54", "za", "South Africa", "kr", "Korea Republic", "Monterrey Stadium", "Guadalupe", "2026-06-24T15:00:00-06:00", "FINISHED", "Group Stage", "A", 1, 0),
  // Matchday 15 — 25 June
  m("m55", "cw", "Curaçao", "ci", "Côte d'Ivoire", "Philadelphia Stadium", "Philadelphia", "2026-06-25T15:00:00-04:00", "FINISHED", "Group Stage", "E", 0, 2),
  m("m56", "ec", "Ecuador", "de", "Germany", "New York New Jersey Stadium", "East Rutherford", "2026-06-25T20:00:00-04:00", "FINISHED", "Group Stage", "E", 2, 1),
  m("m57", "jp", "Japan", "se", "Sweden", "Dallas Stadium", "Arlington", "2026-06-25T17:00:00-05:00", "FINISHED", "Group Stage", "F", 1, 1),
  m("m58", "tn", "Tunisia", "nl", "Netherlands", "Kansas City Stadium", "Kansas City", "2026-06-25T20:00:00-05:00", "FINISHED", "Group Stage", "F", 1, 3),
  m("m59", "tr", "Türkiye", "us", "United States", "Los Angeles Stadium", "Inglewood", "2026-06-25T13:00:00-07:00", "FINISHED", "Group Stage", "D", 3, 2),
  m("m60", "py", "Paraguay", "au", "Australia", "San Francisco Bay Area Stadium", "Santa Clara", "2026-06-25T16:00:00-07:00", "FINISHED", "Group Stage", "D", 0, 0),
  // Round of 32 (verified FIFA results)
  m("m74", "de", "Germany", "py", "Paraguay", "Boston Stadium", "Foxborough", "2026-06-28T16:00:00-04:00", "FINISHED", "Round of 32", "—", 1, 1, "Paraguay win 4–3 on penalties"),
  m("m75", "nl", "Netherlands", "ma", "Morocco", "Monterrey Stadium", "Guadalupe", "2026-06-30T19:00:00-06:00", "FINISHED", "Round of 32", "—", 1, 1, "Morocco win 3–2 on penalties"),
  m("m76", "br", "Brazil", "jp", "Japan", "Houston Stadium", "Houston", "2026-06-30T17:00:00-05:00", "FINISHED", "Round of 32", "—", 2, 1),
  m("m77", "fr", "France", "se", "Sweden", "New York New Jersey Stadium", "East Rutherford", "2026-07-01T20:00:00-04:00", "FINISHED", "Round of 32", "—", 3, 0),
  m("m78", "ci", "Côte d'Ivoire", "no", "Norway", "Dallas Stadium", "Arlington", "2026-07-01T17:00:00-05:00", "FINISHED", "Round of 32", "—", 1, 2),
  m("m79", "mx", "Mexico", "ec", "Ecuador", "Mexico City Stadium", "Mexico City", "2026-07-01T19:00:00-06:00", "FINISHED", "Round of 32", "—", 2, 0),
  m("m80", "gb-eng", "England", "cd", "Congo DR", "Atlanta Stadium", "Atlanta", "2026-07-02T18:00:00-04:00", "FINISHED", "Round of 32", "—", 2, 1),
  m("m81", "us", "United States", "ba", "Bosnia and Herzegovina", "San Francisco Bay Area Stadium", "Santa Clara", "2026-07-02T14:00:00-07:00", "FINISHED", "Round of 32", "—", 2, 0),
  m("m82", "be", "Belgium", "sn", "Senegal", "Seattle Stadium", "Seattle", "2026-07-02T17:00:00-07:00", "FINISHED", "Round of 32", "—", 3, 2, "After extra time"),
  m("m86", "ar", "Argentina", "cv", "Cabo Verde", "Miami Stadium", "Miami Gardens", "2026-07-03T15:00:00-04:00", "FINISHED", "Round of 32", "—", 3, 2, "After extra time"),
  m("m87", "co", "Colombia", "gh", "Ghana", "Kansas City Stadium", "Kansas City", "2026-07-03T18:00:00-05:00", "FINISHED", "Round of 32", "—", 1, 0),
  m("m88", "au", "Australia", "eg", "Egypt", "Dallas Stadium", "Arlington", "2026-07-03T20:00:00-05:00", "FINISHED", "Round of 32", "—", 1, 1, "Egypt win 4–2 on penalties"),
  // Round of 16 — verified FIFA results
  m("m89", "py", "Paraguay", "fr", "France", "Philadelphia Stadium", "Philadelphia", "2026-07-04T15:00:00-04:00", "FINISHED", "Round of 16", "—", 0, 1),
  m("m90", "ca", "Canada", "ma", "Morocco", "Houston Stadium", "Houston", "2026-07-04T18:00:00-05:00", "FINISHED", "Round of 16", "—", 0, 3),
  // Later knockout ties as scheduled by FIFA (scores not fabricated)
  m("m91", "br", "Brazil", "no", "Norway", "New York New Jersey Stadium", "East Rutherford", "2026-07-05T16:00:00-04:00", "SCHEDULED", "Round of 16", "—"),
  m("m92", "mx", "Mexico", "gb-eng", "England", "Mexico City Stadium", "Mexico City", "2026-07-05T20:00:00-06:00", "SCHEDULED", "Round of 16", "—"),
  m("m95", "ar", "Argentina", "eg", "Egypt", "Atlanta Stadium", "Atlanta", "2026-07-06T12:00:00-04:00", "SCHEDULED", "Round of 16", "—"),
  m("m96", "ch", "Switzerland", "co", "Colombia", "BC Place Vancouver", "Vancouver", "2026-07-06T16:00:00-07:00", "SCHEDULED", "Round of 16", "—"),
  m("m97", "fr", "France", "ma", "Morocco", "Boston Stadium", "Foxborough", "2026-07-07T16:00:00-04:00", "SCHEDULED", "Quarter-final", "—"),
  // Final venue & date confirmed by FIFA — pairing TBD until later rounds complete
  m("m104", "tbd", "Winner SF1", "tbd", "Winner SF2", "New York New Jersey Stadium", "East Rutherford", "2026-07-19T15:00:00-04:00", "SCHEDULED", "Final", "—", undefined, undefined, "Confirmed venue: MetLife Stadium · 19 July 2026"),
];

export const news: NewsArticle[] = [
  {
    id: "n1",
    title: "Mexico open World Cup 2026 with a 2–0 win over South Africa at the Azteca",
    slug: "mexico-opening-win",
    description: "Hosts Mexico win the historic opening match at Mexico City Stadium — the first stadium to host three World Cup openers.",
    image: stadiums[0].image,
    category: "Breaking",
    featured: true,
    publishedDate: "2026-06-11T23:00:00Z",
    readTime: 4,
  },
  {
    id: "n2",
    title: "Germany thrash Curaçao 7–1 in Houston — biggest World Cup win in 24 years",
    slug: "germany-curacao-7-1",
    description: "Julian Nagelsmann's side announce themselves with a statement Group E demolition at Houston Stadium.",
    image: stadiums[6].image,
    category: "Match Report",
    featured: true,
    publishedDate: "2026-06-14T23:30:00Z",
    readTime: 5,
  },
  {
    id: "n3",
    title: "Ronaldo becomes first player to score at six World Cups",
    slug: "ronaldo-six-world-cups",
    description: "Portugal's 5–0 win over Uzbekistan in Houston sealed a unique place in football history for Cristiano Ronaldo.",
    image: stadiums[6].image,
    category: "Feature",
    featured: false,
    publishedDate: "2026-06-23T22:00:00Z",
    readTime: 4,
  },
  {
    id: "n4",
    title: "Canada stun Qatar 6–0 in Vancouver as Marsch's side hit top gear",
    slug: "canada-qatar-6-0",
    description: "The co-hosts' biggest World Cup win ever sends BC Place into delirium and keeps Group B wide open.",
    image: stadiums[12].image,
    category: "Match Report",
    featured: false,
    publishedDate: "2026-06-18T23:00:00Z",
    readTime: 3,
  },
  {
    id: "n5",
    title: "Messi & Mbappé tied on 8 as Golden Boot race goes to the wire",
    slug: "golden-boot-race",
    description: "Argentina's captain and France's No.10 sit level atop the scoring charts, with Haaland (7) and Kane (6) close behind.",
    image: stadiums[1].image,
    category: "Analysis",
    featured: false,
    publishedDate: "2026-07-10T10:00:00Z",
    readTime: 6,
  },
  {
    id: "n6",
    title: "USA reach knockouts on home soil after 2–0 win over Australia",
    slug: "usa-australia-seattle",
    description: "Pochettino's USMNT seal Round of 32 qualification in front of a roaring Seattle Stadium crowd.",
    image: stadiums[9].image,
    category: "Match Report",
    featured: false,
    publishedDate: "2026-06-19T23:00:00Z",
    readTime: 4,
  },
];

export const tournamentStats = {
  matchesPlayed: matches.filter((x) => x.status === "FINISHED").length,
  totalMatches: 104,
  goalsScored: matches.reduce((s, x) => s + (x.homeScore ?? 0) + (x.awayScore ?? 0), 0),
  teamsQualified: 48,
  stadiums: 16,
  hostCities: 16,
  topScorer: { name: "Lionel Messi / Kylian Mbappé", goals: 8 },
  groups: 12,
};

export const flagUrl = (code: string, size: "w40" | "w80" | "w160" | "w320" = "w160") =>
  `https://flagcdn.com/${size}/${code}.png`;

export const getTeamByCode = (code: string) => teams.find((t) => t.code === code);

/** Build group standings from finished group-stage matches */
export function getGroupStandings(group: string): GroupStanding[] {
  const groupTeams = teams.filter((t) => t.group === group);
  const table = new Map<string, GroupStanding>();
  for (const team of groupTeams) {
    table.set(team.code, {
      code: team.code,
      country: team.country,
      played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0,
    });
  }

  const groupMatches = matches.filter(
    (m) => m.group === group && m.status === "FINISHED" && m.stage.startsWith("Group")
  );

  for (const match of groupMatches) {
    const home = table.get(match.homeCode);
    const away = table.get(match.awayCode);
    if (!home || !away || match.homeScore == null || match.awayScore == null) continue;
    const hs = match.homeScore;
    const as = match.awayScore;
    home.played++; away.played++;
    home.gf += hs; home.ga += as; home.gd = home.gf - home.ga;
    away.gf += as; away.ga += hs; away.gd = away.gf - away.ga;
    if (hs > as) { home.won++; home.points += 3; away.lost++; }
    else if (hs < as) { away.won++; away.points += 3; home.lost++; }
    else { home.drawn++; away.drawn++; home.points++; away.points++; }
  }

  return Array.from(table.values()).sort((a, b) =>
    b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.country.localeCompare(b.country)
  );
}

export const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;
