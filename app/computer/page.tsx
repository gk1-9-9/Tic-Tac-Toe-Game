import TicTacToe from '@/components/tic-tac-toe'

export default function ComputerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-zinc-800">
      <TicTacToe computerMode={true} />
    </main>
  )
}