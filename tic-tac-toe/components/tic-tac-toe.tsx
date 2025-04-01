"use client"

import { useState, useEffect, useCallback } from "react"
import { Square } from "./square"
import { ScoreCard } from "./score-card"
import { motion, AnimatePresence } from "framer-motion"

type Player = "X" | "O" | null
type GameStatus = "playing" | "won" | "draw"

export default function TicTacToe() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [scores, setScores] = useState<{ X: number; O: number }>({ X: 0, O: 0 })
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [statusMessage, setStatusMessage] = useState<string>("Next player: X")
  const [showWinAnimation, setShowWinAnimation] = useState<boolean>(false)
  const [lastMove, setLastMove] = useState<number | null>(null)

  // Load scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem("ticTacToeScores")
    if (savedScores) {
      try {
        setScores(JSON.parse(savedScores))
      } catch (e) {
        console.error("Failed to parse saved scores:", e)
        // Reset to default if parsing fails
        setScores({ X: 0, O: 0 })
      }
    }
  }, [])

  // Save scores to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ticTacToeScores", JSON.stringify(scores))
    }
  }, [scores])

  // Update status message when game state changes
  useEffect(() => {
    if (gameStatus === "won") {
      const winner = isXNext ? "O" : "X" // Winner is opposite of isXNext since we already flipped it
      setStatusMessage(`Player ${winner} wins!`)
    } else if (gameStatus === "draw") {
      setStatusMessage("It's a draw!")
    } else {
      setStatusMessage(`Next player: ${isXNext ? "X" : "O"}`)
    }
  }, [gameStatus, isXNext])

  const checkForWinner = useCallback((boardSquares: Player[]): { player: Player; line: number[] } | null => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (boardSquares[a] && boardSquares[a] === boardSquares[b] && boardSquares[a] === boardSquares[c]) {
        return { player: boardSquares[a], line: lines[i] }
      }
    }
    return null
  }, [])

  const handleClick = useCallback((i: number) => {
    // Ignore clicks if square is filled or game is over
    if (squares[i] || gameStatus !== "playing") {
      return
    }

    const newSquares = squares.slice()
    newSquares[i] = isXNext ? "X" : "O"
    
    // Track last move for highlighting
    setLastMove(i)
    
    // Update board
    setSquares(newSquares)
    setIsXNext(!isXNext)

    // Check for winner
    const winner = checkForWinner(newSquares)
    if (winner) {
      setWinningLine(winner.line)
      setGameStatus("won")
      setShowWinAnimation(true)

      // Update scores
      setScores((prevScores) => ({
        ...prevScores,
        [winner.player as "X" | "O"]: prevScores[winner.player as "X" | "O"] + 1,
      }))

      // Hide win animation after 2 seconds
      setTimeout(() => {
        setShowWinAnimation(false)
      }, 2000)
    } else if (newSquares.every((square) => square !== null)) {
      setGameStatus("draw")
    }
  }, [squares, isXNext, gameStatus, checkForWinner])

  const newGame = useCallback(() => {
    setSquares(Array(9).fill(null))
    setIsXNext(true)
    setWinningLine(null)
    setGameStatus("playing")
    setShowWinAnimation(false)
    setLastMove(null)
  }, [])

  const resetGame = useCallback(() => {
    newGame()
    setScores({ X: 0, O: 0 }) // Reset scores
  }, [newGame])

  const renderSquare = (i: number) => {
    const isWinningSquare = winningLine?.includes(i) || false
    const isLastMove = lastMove === i
    
    return (
      <Square 
        value={squares[i]} 
        onClick={() => handleClick(i)} 
        isWinningSquare={isWinningSquare} 
        isLastMove={isLastMove}
        index={i} 
        disabled={gameStatus !== "playing" || !!squares[i]}
      />
    )
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      {/* Game Status */}
      <AnimatePresence mode="wait">
        <motion.div
          key={statusMessage}
          className="mb-6 text-xl font-semibold text-white px-6 py-2 rounded-full bg-zinc-700/60 backdrop-blur-sm shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {statusMessage}
        </motion.div>
      </AnimatePresence>

      {/* Board & Score Cards */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
        <ScoreCard player="Player 1 (X)" score={scores.X} isActive={isXNext && gameStatus === "playing"} />

        <motion.div
          className="bg-zinc-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-zinc-600/30 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Win animation overlay */}
          {showWinAnimation && (
            <motion.div 
              className="absolute inset-0 bg-emerald-500/20 z-0 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          
          <div className="grid grid-cols-3 gap-3 relative z-10">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </motion.div>

        <ScoreCard player="Player 2 (O)" score={scores.O} isActive={!isXNext && gameStatus === "playing"} />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          onClick={newGame}
          className="px-8 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 text-white font-medium rounded-full hover:from-zinc-500 hover:to-zinc-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </motion.button>

        <motion.button
          onClick={resetGame}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Scores
        </motion.button>
      </div>
    </div>
  )
}