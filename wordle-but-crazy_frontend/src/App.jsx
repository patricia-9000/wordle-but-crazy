import {useState} from 'react'

import GuessInputBox from './components/GuessInputBox'

const App = () => {
  const GameState = {
    Guessing: 'Guessing',
    Incorrect: 'Incorrect',
    Correct: 'Correct'
  }

const [guess, setGuess] = useState('')
const [currentGameState, setCurrentGameState] = useState(GameState.Guessing)

const makeGuess = (event) => {
  event.preventDefault()
  
  if (guess === 'horse')
    setCurrentGameState(GameState.Correct)
  else {
    setCurrentGameState(GameState.Incorrect)
    setTimeout(() => setCurrentGameState(GameState.Guessing), '25000')
  }

  setGuess('')
}

  return (
    <>
      <GuessInputBox guess={guess} setGuess={setGuess} makeGuess={makeGuess}/>
    </>
  )
}

export default App
