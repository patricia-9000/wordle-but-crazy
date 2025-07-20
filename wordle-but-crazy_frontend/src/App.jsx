import {useState, useEffect} from 'react'
import axios from 'axios'

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

  //Update word written in guess text box
  const updateGuess = (event) => {
    const newGuess = event.target.value

    //Prevent words longer than 5 letters and prevent non-letter characters
    if (newGuess.length < 6 && !/[^a-zA-Z]/.test(newGuess))
      setGuess(newGuess)
  }

  //Submit guesses to backend when 'make guess' button clicked
  const makeGuess = (event) => {
    event.preventDefault()
    let newGuess = {word: guess.toLowerCase()}
    let newPastGuess = null
    
    axios
      .post('http://localhost:3001/api/makeguess', newGuess)
      .then(res => {
        newPastGuess = res.data
        
        //Backend says guess contains an error
        if (newPastGuess.error) {
          console.log(newPastGuess.error)
        //Backend says guess is okay
        } else {
          //Guessed word is correct
          if (newPastGuess.correct) {
            setCurrentGameState(GameState.Correct)
            setTimeout(() => {
              setCurrentGameState(GameState.Guessing)
              setPastGuesses([])
            }, 2500)
          //Guessed word is incorrect
          } else {
            setCurrentGameState(GameState.Incorrect)
            setTimeout(() => setCurrentGameState(GameState.Guessing), 2500)
          }

          setPastGuesses(pastGuesses.concat(newPastGuess))
          setGuess('')
        }
      })
  }

  //Reset game immediately after initial render of app
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/reset')
      .then(res => {})
  }, [])

  //Render app
  return (
    <>
      <PastGuessesList pastGuesses={pastGuesses} Colour={Colour}/>
      <GuessInputBox guess={guess} updateGuess={updateGuess} makeGuess={makeGuess} />
      <CorrectIncorrectMessage GameState={GameState} currentGameState={currentGameState} />
    </>
  )
}

export default App
