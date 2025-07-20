import {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'

import PastGuessesList from './components/guesslist/PastGuessesList'
import StatusMessageLabel from './components/StatusMessageLabel'

const App = () => {
  const Colour = {
    Grey: 'Grey',
    Yellow: 'Yellow',
    Green: 'Green'
  }

  const [gameId, setGameId] = useState(null)
  const gameIdRef = useRef({})
  gameIdRef.current = gameId

  const [guess, setGuess] = useState('')
  const guessRef = useRef({})
  guessRef.current = guess

  const [pastGuesses, setPastGuesses] = useState([])
  const pastGuessesRef = useRef({})
  pastGuessesRef.current = pastGuesses

  const [guessingDisabled, setGuessingDisabled] = useState(false)
  const guessingDisabledRef = useRef({})
  guessingDisabledRef.current = guessingDisabled

  const [statusMessage, setStatusMessage] = useState('')
  const statusMessageRef = useRef({})
  statusMessageRef.current = statusMessage

  //Reset past guesses array and request new game from backend
  const newGame = () => {
    let blankGuesses = []

    for (let i = 0; i < 6; i++) {
      blankGuesses.push({
        number: i,
        word: '     ',
        colours: new Array(5).fill(Colour.Grey),
        correct: false
      })
    }

    setPastGuesses(blankGuesses)

    axios
      .get('http://localhost:3001/api/newgame')
      .then(res => {
        setGameId(res.data.id)
      })
  }

  //Submit guesses to backend when 'make guess' button clicked
  const makeGuess = () => {
    let newGuess = {
      id: gameIdRef.current,
      word: guessRef.current.toLowerCase()
    }

    let newPastGuess = null
    
    axios
      .post('http://localhost:3001/api/makeguess', newGuess)
      .then(res => {
        newPastGuess = res.data
        
        //Backend says guess contains an error
        if (newPastGuess.error) {
          setStatusMessage(newPastGuess.error)
          setTimeout(() => {
            setStatusMessage('')
            setGuess('')
          }, 5000)
        //Backend says guess is okay
        } else {
          //Guessed word is correct
          if (newPastGuess.correct) {
            setGuessingDisabled(true)

            setTimeout(() => {
              setGuessingDisabled(false)

              //Start new game
              newGame()
            }, 2500)
          }

          //Update past guesses
          let newPastGuesses = pastGuessesRef.current
          let guessIndex = newPastGuess.number
          newPastGuesses[guessIndex] = newPastGuess
          setPastGuesses(newPastGuesses)

          setGuess('')
        }
      })
  }

  //Handle key presses
  const keyPressed = useCallback((event) => {
    const key = event.key

    if (key === 'Enter') {
      if (guessRef.current.length === 5) {
        setStatusMessage('')
        makeGuess()
      }
    } else if (key === 'Backspace') {
      const newGuess = guessRef.current.substring(0, guessRef.current.length - 1)
      setGuess(newGuess)
      setStatusMessage(newGuess)
    } else if (!guessingDisabledRef.current 
            && key.length === 1 
            && /^[a-zA-Z]/.test(key) 
            && guessRef.current.length < 5) {
      const newGuess = guessRef.current + key
      setGuess(newGuess)
      setStatusMessage(newGuess)
    }
  }, [])

  //Detect key presses on the page
  useEffect(() => {
    document.addEventListener('keydown', keyPressed, false)

    return () => {
      document.removeEventListener('keydown', keyPressed, false)
    }
  }, [keyPressed])

  //Start game immediately after initial render of app
  useEffect(() => {
    newGame()
  }, [])

  //App CSS
  const style = {
    width: 'max-content',
    margin: 'auto',
    marginTop: '250px',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  }

  //Render app
  return (
    <div style={style}>
      <PastGuessesList pastGuesses={pastGuesses} Colour={Colour}/>
      <StatusMessageLabel statusMessage={statusMessage}/>
    </div>
  )
}

export default App
