import {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'
import styled, {keyframes} from 'styled-components'

import ClueList from './components/cluelist/ClueList'
import Keyboard from './components/keyboard/Keyboard'
import StatusMessageLabel from './components/StatusMessageLabel'

const StyledDiv = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: max-content;
  margin: 100px auto;
`

const popAnim = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
`

const App = () => {
  const BASE_URL = 'http://localhost:3001'
  const MESSAGE_TIME = 2500

  const Colour = {
    LightGrey: '#D3D6DA',
    Grey: '#787C7E',
    Yellow: '#D1B036',
    Green: '#6AAA64'
  }

  const generateBlankClues = () => {
    let blankClues = []

    for (let i = 0; i < 6; i++) {
      blankClues.push({
        number: i,
        word: '     ',
        colours: new Array(5).fill(Colour.Grey),
        correct: false,
        answer: null
      })
    }

    return blankClues
  }

  const generateBlankKeys = () => {
    const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('')
    const blankKeys = letters.map(l => {
      return {
        letter: l,
        colour: null
      }
    })
    return blankKeys
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

  const [clues, setClues] = useState(generateBlankClues())
  const cluesRef = useRef({})
  cluesRef.current = clues

  const [keys, setKeys] = useState(generateBlankKeys())
  const keysRef = useRef({})
  keysRef.current = keys

  const [answer, setAnswer] = useState(null)
  const answerRef = useRef({})
  answerRef.current = answer

  const [guessingDisabled, setGuessingDisabled] = useState(true)
  const guessingDisabledRef = useRef({})
  guessingDisabledRef.current = guessingDisabled

  const [restartState, setRestartState] = useState({
    restarting: false,
    firstWord: ''
  })
  const restartStateRef = useRef({})
  restartStateRef.current = restartState

  const [statusMessage, setStatusMessage] = useState('')

  const [showStatusMessage, setShowStatusMessage] = useState(false)

  //Start new game
  const newGame = () => {
    axios
      .get(`${BASE_URL}/api/newgame`)
      .then(res => {
        setGameId(res.data.id)
        setGuess('')
        setGuessIndex(0)
        setClues(generateBlankClues())
        setKeys(generateBlankKeys())
        setGuessingDisabled(false)
      })
  }

  //Transition from finished game into new game
  const restartGame = () => {
    setRestartState({
      restarting: true,
      firstWord: answerRef.current
    })

    setGuessIndex(0)
    setKeys(generateBlankKeys())

    setTimeout(() => {
      setGuess(restartStateRef.current.firstWord)
      let newClues = generateBlankClues()
      newClues[0].word = restartStateRef.current.firstWord
      setClues(newClues)

      axios
        .get(`${BASE_URL}/api/newgame`)
        .then(res => {
          setGameId(res.data.id)

          let newRestartState = restartStateRef.current
          newRestartState.restarting = false
          setRestartState(newRestartState)

          makeGuess(res.data.id)
          setGuessingDisabled(false)
        })
    }, 1000)
  }

  //Submit guesses to backend when 'make guess' button clicked
  const makeGuess = (id = gameIdRef.current) => {
    let newGuess = {
      word: guessRef.current.toLowerCase()
    }

    let newClue = null
    
    axios
      .post(`${BASE_URL}/api/makeguess/${id}`, newGuess)
      .then(res => {
        newClue = res.data
        
        //Backend says guess isn't a real word
        if (newClue.wordWrong) {
          setStatusMessage('Not in word list')
          setShowStatusMessage(true)

          setTimeout(() => {
            setShowStatusMessage(false)
          }, MESSAGE_TIME)
        //Backend says guess is okay
        } else {
          setGuessIndex(newClue.number + 1)

          //Restart game after a pause if guessed word is correct
          if (newClue.correct) {
            setAnswer(newClue.word)
            setStatusMessage('Correct!')
            setShowStatusMessage(true)
            setGuessingDisabled(true)

            setTimeout(() => {
              setShowStatusMessage(false)
              restartGame()
            }, MESSAGE_TIME)
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

          //Restart game after a pause if all guesses have been used
          if (guessIndexRef.current === 5 && !newClue.correct) {
            setAnswer(newClue.answer)
            setStatusMessage(`The correct answer was ${newClue.answer.toUpperCase()}`)
            setShowStatusMessage(true)
            setGuessingDisabled(true)

            setTimeout(() => {
              setShowStatusMessage(false)
              restartGame()
            }, MESSAGE_TIME)
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

  //Render app
  return (
    <StyledDiv>
      <StatusMessageLabel statusMessage={statusMessage} showStatusMessage={showStatusMessage}/>
      <ClueList clues={clues} guessIndex={guessIndex} restartState={restartState} Colour={Colour} popAnim={popAnim}/>
      <Keyboard keys={keys} keySelected={keySelected} Colour={Colour} popAnim={popAnim} />
    </StyledDiv>
  )
}

export default App
