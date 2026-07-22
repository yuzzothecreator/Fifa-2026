import { Suspense } from "react";
import FixturesClient from "./fixtures-client";

export default function FixturesPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-32 text-center text-white/50">Loading fixtures…</div>
      }
    >
      <FixturesClient />
    </Suspense>
  );
}
