"use client";

import dynamic from "next/dynamic";

// Dynamically import the AppShell which mounts all 8+ farm components
const AppShell = dynamic(() => import("../components/farm/app-shell"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#0B0F17] text-emerald-400 font-mono">
      Loading KhetMitra AgriSync Engine...
    </div>
  ),
});

export default function Page() {
  return <AppShell />;
}
