import { Home, Users, CalendarDays, Building2, User, Newspaper, MessageSquare, LayoutDashboard } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { href: "/stadiums", label: "Stadiums", icon: Building2 },
  { href: "/players", label: "Players", icon: User },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/fan-zone", label: "Fan Zone", icon: MessageSquare },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

// Compact set used on the mobile bottom navigation bar
export const mobileNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/fan-zone", label: "Fans", icon: MessageSquare },
] as const;
