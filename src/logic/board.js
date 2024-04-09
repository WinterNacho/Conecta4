export function checkWinner (board, turn) {
  // Función auxiliar para verificar una línea de 4 fichas consecutivas
  function checkLine (a, b, c, d) {
    return ((a !== '' && a === b && a === c && a === d))
  }

  // Función auxiliar para verificar todas las líneas posibles
  function checkAllLines (board) {
    // Verificar horizontalmente
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (checkLine(board[col][row], board[col + 1][row], board[col + 2][row], board[col + 3][row])) {
          return turn
        }
      }
    }

    // Verificar verticalmente
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (checkLine(board[col][row], board[col][row + 1], board[col][row + 2], board[col][row + 3])) {
          return turn
        }
      }
    }

    // Verificar diagonalmente (hacia arriba y hacia abajo)
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (checkLine(board[col][row], board[col + 1][row + 1], board[col + 2][row + 2], board[col + 3][row + 3])) {
          return turn
        }
        if (checkLine(board[col][row + 3], board[col + 1][row + 2], board[col + 2][row + 1], board[col + 3][row])) {
          return turn
        }
      }
    }

    return null
  }

  return checkAllLines(board)
}

export function checkFinished (board) {
  // Iterar sobre cada celda del tablero
  for (let col = 0; col < board.length; col++) {
    for (let row = 0; row < board[col].length; row++) {
      // Si alguna celda está vacía, el juego no ha terminado
      if (board[col][row] === '') {
        return false
      }
    }
  }
  // Si todas las celdas están ocupadas, el juego ha terminado
  return true
}
