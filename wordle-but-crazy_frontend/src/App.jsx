import {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'

import ClueList from './components/cluelist/ClueList'
import Keyboard from './components/keyboard/Keyboard'
import StatusMessageLabel from './components/StatusMessageLabel'

const App = () => {
  const BASE_URL = 'http://localhost:3001'

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

  const [keys, setKeys] = useState([])
  const keysRef = useRef({})
  keysRef.current = keys

  const [guessingDisabled, setGuessingDisabled] = useState(false)
  const guessingDisabledRef = useRef({})
  guessingDisabledRef.current = guessingDisabled

  const [statusMessage, setStatusMessage] = useState('')
  const statusMessageRef = useRef({})
  statusMessageRef.current = statusMessage

  //Reset states and request new game from backend
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

    setClues(blankClues)
    setGuess('')
    setGuessIndex(0)
    const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('')
    setKeys(letters.map(l => {return {
      letter: l,
      colour: null
    }}))

    axios
      .get(`${BASE_URL}/api/newgame`)
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
      .post(`${BASE_URL}/api/makeguess/${gameIdRef.current}`, newGuess)
      .then(res => {
        newClue = res.data
        
        //Backend says guess isn't a real word
        if (newClue.wordWrong) {
          setStatusMessage('Not in word list')
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

          //Update keyboard
          let newKeys = keysRef.current

          for (let i = 0; i < 5; i ++) {
            for (let j = 0; j < 26; j ++) {
              if (newKeys[j].letter === newClue.word[i]) {
                //Don't change key's colour if it's already green
                if (newKeys[j].colour !== Colour.Green) {
                  newKeys[j].colour = newClue.colours[i]
                }
                break;
              }
            }
          }

          setKeys(newKeys)

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

  //Handle all key selections (both physical key presses and on-screen key clicks)
  const keySelected = key => {
    if (!guessingDisabledRef.current) {
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
  }

  //Handle key presses
  const keyPressed = useCallback((event) => {
    keySelected(event.key)
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
    marginTop: '100px',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  }

  //Render app
  return (
    <div style={style}>
      <StatusMessageLabel statusMessage={statusMessage} />
      <ClueList clues={clues} guessIndex={guessIndex} Colour={Colour}/>
      <Keyboard keys={keys} keySelected={keySelected} Colour={Colour}/>
    </div>
  )
}

export default App
