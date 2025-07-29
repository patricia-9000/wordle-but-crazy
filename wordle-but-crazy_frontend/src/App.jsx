import {useState, useEffect, useRef, useCallback} from 'react'
import axios from 'axios'
import styled, {keyframes} from 'styled-components'

import ClueList from './components/cluelist/ClueList'
import Keyboard from './components/keyboard/Keyboard'
import MessageLabel from './components/MessageLabel'
import ScoreSidebar from './components/score/ScoreSidebar'
import GithubLink from './components/GithubLink'

const StyledDiv = styled.div`
  font-family: sans-serif;
  text-align: center;
  user-select: none;
  width: 800px;
  padding: 25px 25px;
  margin: 50px auto;
  position: relative;
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

  const [message, setMessage] = useState('')

  const [showMessage, setShowMessage] = useState(false)

  const [messageTimeoutId, setMessageTimeoutId] = useState(null)
  const messageTimeoutIdRef = useRef({})
  messageTimeoutIdRef.current = messageTimeoutId

  const [score, setScore] = useState(0)
  const scoreRef = useRef({})
  scoreRef.current = score

  const [wordScore, setWordScore] = useState(0)
  const wordScoreRef = useRef({})
  wordScoreRef.current = wordScore

  const [showPoints, setShowPoints] = useState(false)

  const [showPointsTimeoutId, setShowPointsTimeoutId] = useState(null)
  const showPointsTimeoutIdRef = useRef({})
  showPointsTimeoutIdRef.current = showPointsTimeoutId

  const [showScoreMult, setShowScoreMult] = useState(false)

  //Stop game with given ID from timing out
  const preventTimeout = id => {
    setTimeout(() => {
      if (id === gameIdRef.current) {
        axios
          .get(`/api/preventtimeout/${id}`)
          .then(res => {
            preventTimeout(id)
          })
      }
    }, 60000)
  }

  //Start new game
  const newGame = () => {
    axios
      .get('/api/newgame')
      .then(res => {
        setGameId(res.data.id)
        setGuess('')
        setGuessIndex(0)
        setClues(generateBlankClues())
        setKeys(generateBlankKeys())
        setGuessingDisabled(false)

        preventTimeout(res.data.id)
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
        .get('/api/newgame')
        .then(res => {
          setGameId(res.data.id)

          let newRestartState = restartStateRef.current
          newRestartState.restarting = false
          setRestartState(newRestartState)

          makeGuess(res.data.id)
          setGuessingDisabled(false)

          preventTimeout(res.data.id)
        })
    }, 1000)
  }

  //Multiply word score based on number of unused guesses and add to overall score
  const finalizeScore = won => {
    //Add to overall score if game was won
    if (won) {
      const linesLeft = 6 - guessIndexRef.current

      //Do multiplication if there were unused guesses
      if (linesLeft !== 0) {
        setWordScore(wordScoreRef.current * (2 ** linesLeft))
        setShowScoreMult(true)

        setTimeout(() => {
          setScore(scoreRef.current + wordScoreRef.current)
          setShowScoreMult(false)
          setWordScore(0)
          setTimeout(() => restartGame(), 1500)
        }, 1500)
      //Don't do multiplication if all guesses used
      } else {
        setScore(scoreRef.current + wordScoreRef.current)
        setWordScore(0)
        setTimeout(() => restartGame(), 1500)
      }
    //Move straight to next game if game was lost
    } else {
      setWordScore(0)
      setTimeout(() => restartGame(), 1500)
    }
  }

  const makeMessage = msg => {
    setMessage(msg)
    setShowMessage(true)
    clearTimeout(messageTimeoutIdRef.current)

    setMessageTimeoutId(setTimeout(() => {
      setShowMessage(false)
    }, 2500))
  }

  //Submit guesses to backend when 'make guess' button clicked
  const makeGuess = (id = gameIdRef.current) => {
    let newGuess = {
      word: guessRef.current.toLowerCase()
    }

    let newClue = null
    
    axios
      .post(`/api/makeguess/${id}`, newGuess)
      .then(res => {
        newClue = res.data
        
        //Backend says guess isn't a real word
        if (newClue.wordWrong) {
          makeMessage('Not in word list')
        //Backend says guess is okay
        } else {
          setGuessIndex(newClue.number + 1)

          //Restart game after a pause if guessed word is correct
          if (newClue.correct) {
            setAnswer(newClue.word)
            setGuessingDisabled(true)
            makeMessage('Correct!')

            setTimeout(() => {
              finalizeScore(true)
            }, 1500)
          }

          //Update keyboard
          let newKeys = keysRef.current

          for (let i = 0; i < 5; i ++) {
            for (let j = 0; j < 26; j ++) {
              if (newKeys[j].letter === newClue.word[i]) {
                //Don't change key's colour if it's already green
                
                if (newKeys[j].colour !== 'Green') {
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

          //Update word score
          let newWordScore = wordScoreRef.current

          newClue.colours.forEach(c => {
            if (c === 'Green')
              newWordScore += 50
            else if (c === 'Yellow') {
              newWordScore += 10
            }
          })
          
          setWordScore(newWordScore)

          //Tell the score display to show the score calculation breifly
          setShowPoints(true)
          clearTimeout(showPointsTimeoutIdRef.current)
          setShowPointsTimeoutId(setTimeout(() => {
            setShowPoints(false)
          }, 2500))

          //Restart game after a pause if all guesses have been used
          if (guessIndexRef.current === 5 && !newClue.correct) {
            setAnswer(newClue.answer)
            setGuessingDisabled(true)
            makeMessage(`The correct answer was ${newClue.answer.toUpperCase()}`)

            setTimeout(() => {
              finalizeScore(false)
            }, 1500)
          }
        }
      })
      .catch(err => {
        alert('Session could not be found - fetching new session')
        setWordScore(0)
        newGame()
      })
  }

  //Add given word to the clue list while typing guess
  const updateClueList = newGuess => {
    const displayedGuess = newGuess + ' '.repeat(5 - newGuess.length)
    let newClues = cluesRef.current
    newClues[guessIndexRef.current].word = displayedGuess
    setClues(newClues)
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
          updateClueList(newGuess)
        } else if (key.length === 1
          && /^[a-zA-Z]/.test(key)
          && guessRef.current.length < 5)
        {
          newGuess = guessRef.current + key
          setGuess(newGuess)
          updateClueList(newGuess)
        }
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
    <div>
      <StyledDiv>
        <ScoreSidebar 
          score={score}
          wordScore={wordScore}
          clues={clues}
          guessIndex={guessIndex}
          showPoints={showPoints}
          showScoreMult={showScoreMult}
          popAnim={popAnim}
          Colour={Colour}
        />
        <MessageLabel
          message={message}
          showMessage={showMessage}
        />
        <ClueList
          clues={clues}
          guessIndex={guessIndex}
          restartState={restartState}
          Colour={Colour}
          popAnim={popAnim}
        />
        <Keyboard
          keys={keys}
          keySelected={keySelected}
          Colour={Colour}
          popAnim={popAnim}
        />
      </StyledDiv>
      <GithubLink/>
    </div>
  )
}

export default App
