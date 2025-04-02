import { motion } from "framer-motion"

type ScoreCardProps = {
  player: string
  score: number
  isActive: boolean
  isComputer : boolean
  isThinking : boolean
}

export function ScoreCard({ player, score, isActive }: ScoreCardProps) {
  return (
    <motion.div
      className={`${
        isActive 
          ? "bg-zinc-700/90 ring-2 ring-zinc-400/50" 
          : "bg-zinc-800/70"
      } p-4 rounded-xl transition-all duration-300 w-full md:w-40 shadow-md`}
      animate={{
        scale: isActive ? 1.05 : 1,
        y: isActive ? -5 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-center font-medium text-zinc-300 mb-2 truncate">{player}</h3>
      <motion.div 
        className="text-3xl font-bold text-center text-white"
        key={score} // Re-animate when score changes
        initial={{ scale: 1.5, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
      >
        {score}
      </motion.div>
    </motion.div>
  )
}