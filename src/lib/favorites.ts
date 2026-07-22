"use client";

import * as React from "react";

const KEY = "wc26-favorite-teams";

export function useFavoriteTeams() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavorites(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const toggle = React.useCallback((teamId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = React.useCallback((teamId: string) => favorites.includes(teamId), [favorites]);

  return { favorites, toggle, isFavorite, ready };
}
