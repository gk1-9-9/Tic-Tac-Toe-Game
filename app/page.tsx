// app/page.tsx
import Link from "next/link";
import TicTacToe from "@/components/tic-tac-toe";
import GameLoader from "@/components/GameLoader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 relative overflow-hidden">
      {/* Pure CSS background */}
      <div className="absolute inset-0 bg-zinc-900">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900"></div>
        
        {/* Animated subtle glow elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        
        {/* Dot pattern overlay - using CSS gradients instead of images */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
               backgroundSize: `30px 30px`
             }}>
        </div>
      </div>
      
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mt-6 mb-8 tracking-tight">
          <span className="text-zinc-100">Tic</span>
          <span className="text-zinc-300">-</span>
          <span className="text-zinc-100">Tac</span>
          <span className="text-zinc-300">-</span>
          <span className="text-zinc-100">Toe</span>
        </h1>

        <nav className="w-full max-w-md mb-10">
          <div className="flex justify-center gap-4 p-3 bg-zinc-700/80 backdrop-blur-sm rounded-full shadow-lg">
            <Link
              href="/how-to-play"
              className="px-6 py-2 text-white font-medium rounded-full hover:bg-zinc-600/80 transition-all duration-300 hover:shadow-md"
            >
              Docs
            </Link>
            <Link
              href="/"
              className="px-6 py-2 text-white font-medium bg-zinc-600/90 rounded-full shadow-md transition-all duration-300"
            >
              Play
            </Link>
            <Link
              href="/about"
              className="px-6 py-2 text-white font-medium rounded-full hover:bg-zinc-600/80 transition-all duration-300 hover:shadow-md"
            >
              About Us
            </Link>
          </div>
        </nav>
        
        <GameLoader>
          <TicTacToe />
        </GameLoader>
      </div>
    </main>
  );
}