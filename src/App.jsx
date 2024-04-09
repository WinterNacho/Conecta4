import { useState } from 'react'
import './App.css'
import { TURNS } from './constants.js'
import { Column } from './components/Column'
import { Turn } from './components/Turn'
import { WinnerModal } from './components/WinnerModal'
import confetti from 'canvas-confetti'
import { checkWinner, checkFinished } from './logic/board.js'
import { saveGame, resetGameStorage } from './logic/storage.js'

function App () {
  // board[columna][fila]
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array.from({ length: 7 }, () => Array(6).fill(''))
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.red
  })
  // const [turn, setTurn] = useState(TURNS.red)
  const [winner, setwinner] = useState(null) // null -> ganador // false -> empate

  const updateBoard = (column) => {
    const newBoard = [...board]

    if (winner != null) {
      return
    }
    // Vemos si podemos actualizar el tablero
    for (let n = 5; n >= 0; n--) {
      if (newBoard[column][n] === '') {
        newBoard[column][n] = turn
        break // Salir del bucle si la condición se cumple
      }
      if (n === 0) { // La columna esta llena
        return
      }
    }
    setBoard(newBoard)
    // ver si hay ganador
    const newWinner = checkWinner(newBoard, turn)
    if (newWinner) {
      setwinner(newWinner)
      confetti()
    } else if (checkFinished(newBoard)) {
      setwinner(false)
    }
    // cambiar el turno
    const newTurn = turn === TURNS.red ? TURNS.yellow : TURNS.red
    setTurn(newTurn)
    saveGame(newBoard, newTurn)
  }
  const resetGame = () => {
    setBoard(Array.from({ length: 7 }, () => Array(6).fill('')))
    setTurn(TURNS.red)
    setwinner(null)
    resetGameStorage()
  }
  return (
    <main className='board'>
      <div className='container'>
        <h1>Conecta4</h1>
        <button onClick={resetGame} className='reset'>Reset del juego</button>
      </div>
      <section className='game'>
        {
        board.map((slots, index) =>
          <Column key={index} index={index} updateBoard={updateBoard}>
            {slots}
          </Column>
        )
        }
      </section>
      <section className='turn-section'>
        <Turn isSelected={turn === TURNS.red}>
          {TURNS.red}
        </Turn>
        <Turn isSelected={turn === TURNS.yellow}>
          {TURNS.yellow}
        </Turn>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
