import Link from "next/link"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-zinc-800 to-zinc-900">
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
              className="px-6 py-2 text-white font-medium rounded-full hover:bg-zinc-600/80 transition-all duration-300 hover:shadow-md"
            >
              Play
            </Link>
            <Link
              href="/about"
              className="px-6 py-2 text-white font-medium bg-zinc-600/90 rounded-full shadow-md transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </nav>

        <div className="max-w-2xl w-full bg-zinc-700/80 backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl border border-zinc-600/30">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">
            About Us
          </h2>

          <div className="space-y-6">
            <p className="text-zinc-300 leading-relaxed">
              Welcome to our Tic-Tac-Toe game! This project was created as a modern implementation of the classic game
              using React and Next.js with TypeScript.
            </p>

            <div className="flex justify-center my-8">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-xl transform rotate-45"></div>
                <div className="absolute inset-2 bg-zinc-800 rounded-lg transform rotate-45 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white transform -rotate-45">X|O</span>
                </div>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              Our goal was to create a clean, responsive, and visually appealing version of Tic-Tac-Toe that works
              across all devices while maintaining the simplicity and fun of the original game.
            </p>

            <p className="text-zinc-300 leading-relaxed">
              The game features a score tracking system to keep track of wins between players, a clean user interface,
              and responsive design for mobile and tablet devices.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 text-white font-medium rounded-full hover:from-zinc-500 hover:to-zinc-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Play Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

