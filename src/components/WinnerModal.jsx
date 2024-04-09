export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const WinnerText = winner === false ? 'Empate' : 'Ganó:'
  return (
    <section className='winner'>
      <div className='text'>
        <h2> {WinnerText} </h2>
        <header className='win'>
          {winner && <div className='slot'> {winner} </div>}
        </header>
        <footer>
          <button onClick={resetGame}>
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  )
}
