import { useState, useEffect } from 'react';
import './App.scss';
import classNames from 'classnames';

const WINNING_COMBINATIONS: number[][] = [

  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonal
  [0, 4, 8],
  [2, 4, 6]

]

const App = () => {
  const [gameNumber, setGameNumber] = useState(0)
  const [scoreX, setScoreX] = useState(0)
  const [scoreO, setScoreO] = useState(0)
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [currentTurn, setCurrentTurn] = useState('X')
  const [winner, setWinner] = useState('')

  const reset = () => {
    setBoard(['', '', '', '', '', '', '', '', ''])
    setCurrentTurn('X')
    setWinner('')
  }

  useEffect(() => {
    let winnerIfFound = ''
    let winnerCoord = [0, 0]
    for (const comb of WINNING_COMBINATIONS) {
      const elements = Array.from(new Set(comb.map(i => board[i])))

      if (elements.length === 1 && !elements.includes('')) {
        winnerIfFound = elements.pop()!
        winnerCoord = [comb[0], comb[2]]
        break
      }
    }

    if (!(new Set(board).has(''))) {
      setGameNumber(number => number + 1)
      return;
    }

    if (winnerIfFound) {
      setWinner(winnerIfFound)
      setGameNumber(number => number + 1)
      if (winnerIfFound === 'X') {
        setScoreX(current => current + 1)
      }
      if (winnerIfFound === 'O') {
        setScoreO(current => current + 1)
      }
    }
  }, [board])

  const setValue = (index: number) => {
    const boardCopy = [...board]
    boardCopy[index] = currentTurn


    setBoard(boardCopy)
    setCurrentTurn(
      currentTurn === 'X' ? 'O' : 'X'
    )
  }

  return (
    <div className='App box'>

      <div className="result">
        <div className="box result__game-number">
          <span>Games: </span>
          <p>{gameNumber}</p>
        </div>
        <div className="box results-wrapper">
          <div className=" result__player result__player--X">
            <span>X:</span>
            <p>{scoreX}</p>
          </div>

          <div className=" result__player result__player--X">
            <span>O:</span>
            <p>{scoreO}</p>
          </div>
        </div>
      </div>

      <div className="game">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            title={`${i}`}
            className={
              classNames(`game__cell game__cell--${i}`, {
                'game__cell--X': board[i] === 'X',
                'game__cell--O': board[i] === 'O',
                'game__cell--disabled': winner !== '' || board[i] !== ''
              })
            }
            onClick={(event) => {
              let target = event.target as HTMLDivElement
              let index = Number(target.title)

              setValue(index)
            }}
          >
          </div>)
        )}
      </div>

      <input
        className='game__button'
        type="reset"
        onClick={reset}
      />
    </div>
  )
}

export default App;