import Link from "next/link"

export default function HowToPlay() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background container with fixed positioning to ensure full coverage */}
      <div className="fixed inset-0 w-full h-full">
        {/* Base gradient */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900"></div>
        
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

      {/* Content container with relative positioning and proper z-index */}
      <div className="relative z-10 w-full flex flex-col items-center p-4">
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
              className="px-6 py-2 text-white font-medium bg-zinc-600/90 rounded-full shadow-md transition-all duration-300"
            >
              Docs
            </Link>
            <Link
              href="/"
              className="px-6 py-2 text-white font-medium rounded-full hover:bg-zinc-600/80 transition-all duration-300 hover:shadow-md"
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

        <div className="max-w-2xl w-full bg-zinc-700/80 backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl border border-zinc-600/30">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">
            How to Play
          </h2>

          <div className="space-y-8">
            <section className="bg-zinc-800/50 p-5 rounded-xl border border-zinc-700/50">
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Game Objective</h3>
              <p className="text-zinc-300">
                The goal is to be the first player to form a line of three of your symbols (X or O) horizontally,
                vertically, or diagonally on the 3×3 grid.
              </p>
            </section>

            <section className="bg-zinc-800/50 p-5 rounded-xl border border-zinc-700/50">
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Rules</h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>The game is played on a 3×3 grid.</li>
                <li>Player 1 uses X and Player 2 uses O.</li>
                <li>Players take turns placing their symbol in an empty square.</li>
                <li>
                  The first player to get three of their symbols in a row (horizontally, vertically, or diagonally)
                  wins.
                </li>
                <li>If all squares are filled and no player has three in a row, the game is a draw.</li>
              </ul>
            </section>

            <section className="bg-zinc-800/50 p-5 rounded-xl border border-zinc-700/50">
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Scoring</h3>
              <p className="text-zinc-300">
                The game keeps track of how many times each player has won. The score is displayed on the sides of the
                game board.
              </p>
            </section>

            <section className="bg-zinc-800/50 p-5 rounded-xl border border-zinc-700/50">
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Tips</h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                <li>Try to control the center square as it's part of more possible winning combinations.</li>
                <li>Block your opponent if they have two in a row.</li>
                <li>Create "forks" where you have two possible ways to win in your next move.</li>
              </ul>
            </section>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 text-white font-medium rounded-full hover:from-zinc-500 hover:to-zinc-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Playing
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}