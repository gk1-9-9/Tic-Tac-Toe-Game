import { motion } from "framer-motion"

type SquareProps = {
  value: "X" | "O" | null
  onClick: () => void
  isWinningSquare: boolean
  isLastMove?: boolean
  index: number
  disabled?: boolean
}

export function Square({ value, onClick, isWinningSquare, isLastMove = false, index, disabled = false }: SquareProps) {
  const getSymbolColor = (player: "X" | "O" | null) => {
    if (!player) return ""
    return player === "X" ? "text-blue-400" : "text-rose-400"
  }

  const getDelay = () => {
    // Calculate delay for initial animation
    const row = Math.floor(index / 3)
    const col = index % 3
    return (row + col) * 0.1
  }

  return (
    <motion.button
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center rounded-lg text-4xl font-bold ${
        isWinningSquare 
          ? "bg-emerald-500/30 border-2 border-emerald-400" 
          : isLastMove
          ? "bg-zinc-500/40 border-2 border-zinc-400"
          : "bg-zinc-600/50 hover:bg-zinc-500/50"
      } transition-colors duration-300 ${disabled ? "cursor-default" : "cursor-pointer"}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: getDelay(), duration: 0.3 }}
      disabled={disabled}
    >
      {value && (
        <motion.span
          className={`block ${getSymbolColor(value)}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  )
}