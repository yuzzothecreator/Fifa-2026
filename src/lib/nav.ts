import { Home, Users, CalendarDays, Building2, User, Newspaper, MessageSquare, LayoutDashboard, Grid3X3, Wand2, GitBranch } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/groups", label: "Groups", icon: Grid3X3 },
  { href: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { href: "/knockout", label: "Knockout", icon: GitBranch },
  { href: "/stadiums", label: "Stadiums", icon: Building2 },
  { href: "/players", label: "Players", icon: User },
  { href: "/fantasy", label: "Fantasy", icon: Wand2 },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/fan-zone", label: "Fan Zone", icon: MessageSquare },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

export const mobileNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/groups", label: "Groups", icon: Grid3X3 },
  { href: "/fixtures", label: "Match", icon: CalendarDays },
  { href: "/knockout", label: "Bracket", icon: GitBranch },
  { href: "/fantasy", label: "Fantasy", icon: Wand2 },
] as const;
