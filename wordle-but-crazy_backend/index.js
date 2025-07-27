const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const fs = require('fs')
const nthline = require('nthline')

const morgan = require('morgan')
app.use(morgan('tiny'))

const FIVE_LETTER_WORDS = 5757
const WORDS_FILEPATH = './WORDS'

const Colour = {
  Grey: 'Grey',
  Yellow: 'Yellow',
  Green: 'Green'
}

//Array representing all currently active games being played by different clients
let activeGames = []
let maxId = 0

//Log active games
const logGames = () => {
  console.log('[')
  activeGames.forEach(g => console.log(`\t{ id: ${g.id}, targetWord: ${g.targetWord} }`))
  console.log(']')
}

//End game with given ID
const endGame = id => {
  let newActiveGames = []
  let gameExists = false

  for (let i = 0; i < activeGames.length; i ++) {
    if (activeGames[i].id !== id)
      newActiveGames.push(activeGames[i])
    else
      gameExists = true
  }

  activeGames = newActiveGames
  return gameExists
}

//Restart timeout of given game
const restartTimeout = game => {
  clearTimeout(game.timeoutId)
  game.timeoutId = setTimeout(() => {
    if (endGame(game.id)) {
      console.log(`Timed out game with ID ${game.id}`)
      logGames()
    }
  }, 120000)
}

//Start new game
app.get('/api/newgame', (req, res) => {
  //Choose new random target word
  const wordNumber = Math.floor(Math.random() * FIVE_LETTER_WORDS)
  nthline(wordNumber, WORDS_FILEPATH)
    .then(randomWord => {
      //Create new game
      const newGame = {
        id: maxId++,
        targetWord: randomWord,
        guesses: 0,
        timeoutId: null
      }

      activeGames.push(newGame)
      restartTimeout(newGame)
      console.log(`Started game with ID ${newGame.id}`)
      logGames()

      res.json({
        id: newGame.id
      })
    })
})

//Reset game's timeout
app.get('/api/preventtimeout/:id', (req, res) => {
  //Find client's game using their game ID
  const id = parseInt(req.params.id)
  const currentGame = activeGames.find(g => g.id === id)

  //Return 404 if game can't be found
  if (!currentGame)
    res.status(404).end()
  else {
    restartTimeout(currentGame)
    res.end()
  }
})

//Handle incoming guessed word
app.post('/api/makeguess/:id', (req, res) => {
  //Find client's game using their game ID
  const id = parseInt(req.params.id)
  const currentGame = activeGames.find(g => g.id === id)

  //Return 404 if game can't be found
  if (!currentGame)
    res.status(404).end()
  //Proceed if game is found
  else {
    restartTimeout(currentGame)

    const guess = req.body.word

    //Check if the guess is a real word
    const fileStream = fs.createReadStream(WORDS_FILEPATH)
    let matchedRealWord = false

    fileStream.on('data', d => {
      if (!matchedRealWord)
        matchedRealWord = d.toString().includes(guess)
    })

    fileStream.on('close', () => {
      //Return word wrong flag if guess isn't recognised as a word
      if (!matchedRealWord) {
        res.json({
          wordWrong: true
        })
      //Proceed if word is recognised
      } else {
        const targetWord = currentGame.targetWord

        let newClue = {
          number: currentGame.guesses,
          word: guess,
          colours: new Array(5).fill(Colour.Grey),
          correct: false,
          answer: null
        }

        currentGame.guesses++

        //Whole word is correct
        if (guess === targetWord) {
          newClue.colours = new Array(5).fill(Colour.Green)
          newClue.correct = true

          //End current game
          endGame(id)
          console.log(`Game with ID ${id} was won`)
          logGames()
        //Whole word is not correct
        } else {
          //Stop the same letter in the target word from flagging more than one letter in the guessed word
          let targetCharsHit = new Array(5).fill(false)

          //Right letter, right position
          for (let i = 0; i < 5; i++) {
            if (guess.charAt(i) === targetWord.charAt(i)) {
              newClue.colours[i] = Colour.Green
              targetCharsHit[i] = true
            }
          }

          //Right letter, wrong position
          for (let i = 0; i < 5; i++) {
            //Skip this letter if it's already green
            if (newClue.colours[i] !== Colour.Green)
            {
              const guessedChar = guess.charAt(i)

              if (targetWord.includes(guessedChar)) {
                //Check all occurences of the guessed letter in the target word in case one has already been hit
                for (let j = 0; j < 5; j ++) {
                  if (targetWord[j] === guessedChar && targetCharsHit[j] === false) {
                    newClue.colours[i] = Colour.Yellow
                    targetCharsHit[j] = true
                  }
                }
              }
            }
          }

          //After 5 guesses, provide the answer and end the game
          if (currentGame.guesses === 6) {
            newClue.answer = targetWord
            endGame(id)
            console.log(`Game with ID ${id} was lost`)
            logGames()
          }
        }

        res.json(newClue)
      }
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
