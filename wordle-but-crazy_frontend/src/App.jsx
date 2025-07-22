import {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'

import ClueList from './components/cluelist/ClueList'
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

  const [guessIndex, setGuessIndex] = useState(0)
  const guessIndexRef = useRef({})
  guessIndexRef.current = guessIndex

  const [clues, setClues] = useState([])
  const cluesRef = useRef({})
  cluesRef.current = clues

  const [guessingDisabled, setGuessingDisabled] = useState(false)
  const guessingDisabledRef = useRef({})
  guessingDisabledRef.current = guessingDisabled

  const [statusMessage, setStatusMessage] = useState('')
  const statusMessageRef = useRef({})
  statusMessageRef.current = statusMessage

  //Reset clues array and request new game from backend
  const newGame = () => {
    let blankClues = []

    for (let i = 0; i < 6; i++) {
      blankClues.push({
        number: i,
        word: '     ',
        colours: new Array(5).fill(Colour.Grey),
        correct: false
      })
    }

    setGuess('')
    setClues(blankClues)
    setGuessIndex(0)

    axios
      .get('http://localhost:3001/api/newgame')
      .then(res => {
        setGameId(res.data.id)
      })
  }

  //Submit guesses to backend when 'make guess' button clicked
  const makeGuess = () => {
    let newGuess = {
      word: guessRef.current.toLowerCase()
    }

    let newClue = null
    
    axios
      .post(`http://localhost:3001/api/makeguess/${gameIdRef.current}`, newGuess)
      .then(res => {
        newClue = res.data
        
        //Backend says guess isn't a real word
        if (newClue.wordWrong) {
          setStatusMessage('Not recognised as a word')
          setTimeout(() => {
            setStatusMessage('')
          }, 5000)
        //Backend says guess is okay
        } else {
          setGuessIndex(newClue.number + 1)

          //End game after a pause if guessed word is correct
          if (newClue.correct) {
            setGuessingDisabled(true)
            setTimeout(() => {
              setGuessingDisabled(false)
              newGame()
            }, 2500)
          }

          //Update clues
          let newClues = cluesRef.current
          newClues[guessIndexRef.current] = newClue
          setClues(newClues)

          setGuess('')

          //End game after a pause if all guesses have been used
          if (guessIndexRef.current === 5) {
            setStatusMessage(`The correct answer was ${newClue.answer}`)
            setGuessingDisabled(true)
            setTimeout(() => {
              setStatusMessage('')
              setGuessingDisabled(false)
              newGame()
            }, 2500)
          }
        }
      })
      .catch(err => {
        alert('Session could not be found - fetching new session')
        newGame()
      })
  }

  //Handle key presses
  const keyPressed = useCallback((event) => {
    if (!guessingDisabledRef.current) {
      const key = event.key
      let newGuess = ''

      if (key === 'Enter') {
        if (guessRef.current.length === 5)
          makeGuess()
      } else {
        if (key === 'Backspace') {
          newGuess = guessRef.current.substring(0, guessRef.current.length - 1)
          setGuess(newGuess)
        } else if (key.length === 1 
                && /^[a-zA-Z]/.test(key) 
                && guessRef.current.length < 5) {
          newGuess = guessRef.current + key
          setGuess(newGuess)
        }

        const displayedGuess = newGuess + ' '.repeat(5 - newGuess.length)
        let newClues = cluesRef.current
        newClues[guessIndexRef.current].word = displayedGuess
        setClues(newClues)
      }
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
    marginTop: '260px',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  }

  //Render app
  return (
    <div style={style}>
      <ClueList clues={clues} guessIndex={guessIndex} Colour={Colour}/>
      <StatusMessageLabel statusMessage={statusMessage}/>
    </div>
  )
}

export default App
