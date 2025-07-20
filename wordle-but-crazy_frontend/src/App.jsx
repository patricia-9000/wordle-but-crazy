import {useState, useEffect} from 'react'
import axios from 'axios'

import PastGuessesList from './components/guesslist/PastGuessesList'
import GuessInputBox from './components/GuessInputBox'
import StatusMessageLabel from './components/StatusMessageLabel'

const App = () => {
  const Colour = {
    Grey: 'Grey',
    Yellow: 'Yellow',
    Green: 'Green'
  }

  const [gameId, setGameId] = useState(null)
  const [guess, setGuess] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [pastGuesses, setPastGuesses] = useState([])
  const [guessingDisabled, setGuessingDisabled] = useState(false)

  //Ask backend to start a new game
  const newGame = () => {
    axios
      .get('http://localhost:3001/api/newgame')
      .then(res => {
        setGameId(res.data.id)
      })
  }

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

    let newGuess = {
      id: gameId,
      word: guess.toLowerCase()
    }

    let newPastGuess = null
    
    axios
      .post('http://localhost:3001/api/makeguess', newGuess)
      .then(res => {
        newPastGuess = res.data
        
        //Backend says guess contains an error
        if (newPastGuess.error) {
          setStatusMessage(newPastGuess.error)
          setTimeout(() => setStatusMessage(''), 5000)
        //Backend says guess is okay
        } else {
          //Guessed word is correct
          if (newPastGuess.correct) {
            setGuessingDisabled(true)
            setStatusMessage('Correct!')

            setTimeout(() => {
              setGuessingDisabled(false)
              setStatusMessage('')
              setPastGuesses([])

              //Start new game
              newGame()
            }, 2500)
          }

          setPastGuesses(pastGuesses.concat(newPastGuess))
          setGuess('')
        }
      })
  }

  //Start new game immediately after initial render of app
  useEffect(() => {
    newGame()
  }, [])

  //Render app
  return (
    <>
      <PastGuessesList pastGuesses={pastGuesses} Colour={Colour}/>
      <GuessInputBox guess={guess} updateGuess={updateGuess} makeGuess={makeGuess} guessingDisabled={guessingDisabled}/>
      <StatusMessageLabel statusMessage={statusMessage}/>
    </>
  )
}

export default App
