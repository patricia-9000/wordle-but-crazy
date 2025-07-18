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

const updateGuess = (event) => {
  const newGuess = event.target.value

  if (newGuess.length < 6 && !/[^a-zA-Z]/.test(newGuess))
    setGuess(newGuess)
}

const makeGuess = (event) => {
  event.preventDefault()
  let newGuess = guess.toLowerCase()

  if (newGuess === 'horse')
    setCurrentGameState(GameState.Correct)
  else
    setCurrentGameState(GameState.Incorrect)

  setTimeout(() => setCurrentGameState(GameState.Guessing), 2500)
  setGuess('')
}

  return (
    <>
      <GuessInputBox guess={guess} updateGuess={updateGuess} makeGuess={makeGuess} />
      <CorrectIncorrectMessage GameState={GameState} currentGameState={currentGameState} />
    </>
  )
}

export default App
