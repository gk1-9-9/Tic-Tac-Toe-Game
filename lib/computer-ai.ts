type Player = "X" | "O" | null;

export function makeComputerMove(squares: Player[]): number {
  // Simple AI implementation - find first empty square
  
  // First, check if computer can win
  const winningMove = findWinningMove(squares, "O");
  if (winningMove !== -1) return winningMove;
  
  // Second, block player if they can win
  const blockingMove = findWinningMove(squares, "X");
  if (blockingMove !== -1) return blockingMove;
  
  // Take center if available
  if (squares[4] === null) return 4;
  
  // Take corners if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available space
  const availableSquares = squares
    .map((square, index) => square === null ? index : -1)
    .filter(index => index !== -1);
  
  if (availableSquares.length === 0) return -1;
  
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
}

// Helper function to find a winning move for a player
function findWinningMove(squares: Player[], player: "X" | "O"): number {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
  ];
  
  for (const line of lines) {
    const [a, b, c] = line;
    // If two positions have the player's symbol and the third is empty
    if (
      squares[a] === player && 
      squares[b] === player && 
      squares[c] === null
    ) return c;
    if (
      squares[a] === player && 
      squares[c] === player && 
      squares[b] === null
    ) return b;
    if (
      squares[b] === player && 
      squares[c] === player && 
      squares[a] === null
    ) return a;
  }
  
  return -1;
}