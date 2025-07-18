import {useState} from 'react'

import GuessInputBox from './components/GuessInputBox'
import CorrectIncorrectMessage from './components/CorrectIncorrectMessage'

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
    setTimeout(() => setCurrentGameState(GameState.Guessing), 2500)
  }

  setGuess('')
}

  return (
    <>
      <GuessInputBox guess={guess} setGuess={setGuess} makeGuess={makeGuess} />
      <CorrectIncorrectMessage GameState={GameState} currentGameState={currentGameState} />
    </>
  )
}

export default App
