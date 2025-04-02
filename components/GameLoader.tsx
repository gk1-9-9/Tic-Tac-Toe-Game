// components/GameLoader.tsx
"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface GameLoaderProps {
  children: React.ReactNode;
}

export default function GameLoader({ children }: GameLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md h-80 bg-zinc-800/50 backdrop-blur-sm rounded-xl shadow-xl">
        <LoadingSpinner size="large" color="#a78bfa" />
        <p className="mt-6 text-zinc-300 text-lg font-medium">Loading game...</p>
      </div>
    );
  }

  return <>{children}</>;
}