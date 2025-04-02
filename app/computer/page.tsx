import TicTacToe from '@/components/tic-tac-toe'

export default function ComputerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-zinc-800 relative">
      <div 
        className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-25 z-0"
      ></div>

      <div className="relative z-10">
        <TicTacToe computerMode={true} />
      </div>
    </main>
  )
}