"use client"

import { useState, useEffect, useCallback } from "react"
import { Square } from "./square"
import { ScoreCard } from "./score-card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Player = "X" | "O" | null
type GameStatus = "playing" | "won" | "draw"

interface TicTacToeProps {
  computerMode?: boolean
}

export default function TicTacToe({ computerMode = false }: TicTacToeProps) {
  const pathname = usePathname()
  const isComputerPage = pathname === "/computer"
  
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [scores, setScores] = useState<{ X: number; O: number }>({ X: 0, O: 0 })
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [statusMessage, setStatusMessage] = useState<string>("Next player: X")
  const [showWinAnimation, setShowWinAnimation] = useState<boolean>(false)
  const [lastMove, setLastMove] = useState<number | null>(null)
  const [isComputerThinking, setIsComputerThinking] = useState<boolean>(false)

  // Load scores from localStorage
  useEffect(() => {
    const scoreKey = isComputerPage ? "ticTacToeScoresComputer" : "ticTacToeScores"
    const savedScores = localStorage.getItem(scoreKey)
    if (savedScores) {
      try {
        setScores(JSON.parse(savedScores))
      } catch (e) {
        console.error("Failed to parse saved scores:", e)
        // Reset to default if parsing fails
        setScores({ X: 0, O: 0 })
      }
    }
  }, [isComputerPage])

  // Save scores to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scoreKey = isComputerPage ? "ticTacToeScoresComputer" : "ticTacToeScores"
      localStorage.setItem(scoreKey, JSON.stringify(scores))
    }
  }, [scores, isComputerPage])

  // Update status message when game state changes
  useEffect(() => {
    if (gameStatus === "won") {
      const winner = isXNext ? "O" : "X" // Winner is opposite of isXNext since we already flipped it
      const winnerName = winner === "X" ? "Player 1" : (isComputerPage ? "Computer" : "Player 2")
      setStatusMessage(`${winnerName} wins!`)
    } else if (gameStatus === "draw") {
      setStatusMessage("It's a draw!")
    } else {
      if (isComputerPage && !isXNext) {
        setStatusMessage("Computer is thinking...")
      } else {
        setStatusMessage(`Next player: ${isXNext ? "X" : "O"}`)
      }
    }
  }, [gameStatus, isXNext, isComputerPage])

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

  // Make computer move when it's computer's turn
  useEffect(() => {
    if (isComputerPage && !isXNext && gameStatus === "playing") {
      setIsComputerThinking(true)
      
      // Add a small delay to make it feel more natural
      const timer = setTimeout(() => {
        makeComputerMove();
        setIsComputerThinking(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isComputerPage, isXNext, gameStatus]);

  // Computer AI function
  const makeComputerMove = () => {
    // Skip if game is over or it's not computer's turn
    if (gameStatus !== "playing" || isXNext) return;
    
    // Find best move
    const bestMove = findBestMove(squares);
    if (bestMove !== -1) {
      handleClick(bestMove);
    }
  };

  // Find the best move for the computer
  const findBestMove = (boardSquares: Player[]): number => {
    // First, check if computer can win
    const winningMove = findWinningMove(boardSquares, "O");
    if (winningMove !== -1) return winningMove;
    
    // Second, block player if they can win
    const blockingMove = findWinningMove(boardSquares, "X");
    if (blockingMove !== -1) return blockingMove;
    
    // Take center if available
    if (boardSquares[4] === null) return 4;
    
    // Take corners if available
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => boardSquares[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available space
    const availableSquares = boardSquares
      .map((square, index) => square === null ? index : -1)
      .filter(index => index !== -1);
    
    if (availableSquares.length === 0) return -1;
    
    return availableSquares[Math.floor(Math.random() * availableSquares.length)];
  };

  // Helper function to find a winning move for a player
  const findWinningMove = (boardSquares: Player[], player: "X" | "O"): number => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      // If two positions have the player's symbol and the third is empty
      if (
        boardSquares[a] === player && 
        boardSquares[b] === player && 
        boardSquares[c] === null
      ) return c;
      if (
        boardSquares[a] === player && 
        boardSquares[c] === player && 
        boardSquares[b] === null
      ) return b;
      if (
        boardSquares[b] === player && 
        boardSquares[c] === player && 
        boardSquares[a] === null
      ) return a;
    }
    
    return -1;
  };

  const handleClick = useCallback((i: number) => {
    // Ignore clicks if square is filled or game is over
    if (squares[i] || gameStatus !== "playing" || (isComputerPage && !isXNext && isComputerThinking)) {
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
  }, [squares, isXNext, gameStatus, checkForWinner, isComputerPage, isComputerThinking])

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
        disabled={gameStatus !== "playing" || !!squares[i] || (isComputerPage && !isXNext && isComputerThinking)}
      />
    )
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl">
      {/* Game modes tabs */}
      <div className="flex gap-4 mb-6 self-center">
        <Link href="/">
          <motion.div
            className={`px-5 py-2 ${!isComputerPage ? 'bg-zinc-600' : 'bg-zinc-700/80'} text-white font-medium rounded-lg cursor-pointer`}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(113, 113, 122, 0.9)" }}
            whileTap={{ scale: 0.95 }}
          >
            2 Players
          </motion.div>
        </Link>
        <Link href="/computer">
          <motion.div
            className={`px-5 py-2 ${isComputerPage ? 'bg-zinc-600' : 'bg-zinc-700/80'} text-white font-medium rounded-lg cursor-pointer`}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(113, 113, 122, 0.9)" }}
            whileTap={{ scale: 0.95 }}
          >
            Computer
          </motion.div>
        </Link>
      </div>

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

        <ScoreCard 
          player={isComputerPage ? "Computer (O)" : "Player 2 (O)"} 
          score={scores.O} 
          isActive={!isXNext && gameStatus === "playing"}
          isComputer={isComputerPage && !isXNext} 
          isThinking={isComputerThinking}
        />
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