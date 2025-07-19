import {useState} from 'react'

import PastGuessesList from './components/guesslist/PastGuessesList'
import GuessInputBox from './components/GuessInputBox'
import CorrectIncorrectMessage from './components/CorrectIncorrectMessage'

const App = () => {
  const GameState = {
    Guessing: 'Guessing',
    Incorrect: 'Incorrect',
    Correct: 'Correct'
  }

  const Colour = {
    Grey: 'Grey',
    Yellow: 'Yellow',
    Green: 'Green'
  }

const [guess, setGuess] = useState('')
const [currentGameState, setCurrentGameState] = useState(GameState.Guessing)
const [pastGuesses, setPastGuesses] = useState([])
const [guessNumber, setGuessNumber] = useState(1)

const updateGuess = (event) => {
  const newGuess = event.target.value

  if (newGuess.length < 6 && !/[^a-zA-Z]/.test(newGuess))
    setGuess(newGuess)
}

const makeGuess = (event) => {
  event.preventDefault()
  let newGuess = guess.toLowerCase()
  let newPastGuess = {
    number: guessNumber,
    word: newGuess,
    colours: new Array(5).fill(Colour.Grey, 0, 5)
  }

  setGuessNumber(guessNumber + 1)

  const targetWord = 'horse'

  if (newGuess === targetWord) {
    setCurrentGameState(GameState.Correct)
    newPastGuess.colours = new Array(5).fill(Colour.Green)
  } else {
    setCurrentGameState(GameState.Incorrect)

    for (let i = 0; i < 5; i++) {
      const targetChar = targetWord.charAt(i)

      if (newGuess.charAt(i) === targetChar)
        newPastGuess.colours[i] = Colour.Green
      else if (newGuess.includes(targetChar))
        newPastGuess.colours[newGuess.indexOf(targetChar)] = Colour.Yellow
    }
  }

  setTimeout(() => setCurrentGameState(GameState.Guessing), 2500)
  setPastGuesses(pastGuesses.concat(newPastGuess))
  setGuess('')
}

  return (
    <>
      <PastGuessesList pastGuesses={pastGuesses} Colour={Colour}/>
      <GuessInputBox guess={guess} updateGuess={updateGuess} makeGuess={makeGuess} />
      <CorrectIncorrectMessage GameState={GameState} currentGameState={currentGameState} />
    </>
  )
}

export default App
