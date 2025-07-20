const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const fs = require('fs')
const nthline = require('nthline')

const FIVE_LETTER_WORDS = 3103
const WORDS_FILEPATH = './WORDS'

const Colour = {
  Grey: 'Grey',
  Yellow: 'Yellow',
  Green: 'Green'
}

//Array representing all currently active games being played by different clients
let activeGames = []
let maxId = 0

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
        guesses: 0
      }

      activeGames.push(newGame)
      console.log(JSON.stringify(activeGames))

      //Delete this game after 15 minutes
      setTimeout(() => {
        activeGames = activeGames.filter(g => g.id !== newGame.id)
        console.log(JSON.stringify(activeGames))
      }, 900000)

      res.json({
        id: newGame.id
      })
    })
})

//Handle incoming guessed word
app.post('/api/makeguess', (req, res) => {
  //Find client's game using their game ID
  const id = req.body.id
  const currentGame = activeGames.find(g => g.id === id)

  //Return error message if game can't be found
  if (!currentGame) {
    res.json({
      error: 'Session could not be found and may have timed out - please refresh'
    })
  //Proceed if game is found
  } else {
    const guess = req.body.word

    //Check if the guess is a real word
    const fileStream = fs.createReadStream(WORDS_FILEPATH)
    let matchedRealWord = false

    fileStream.on('data', d => {
      if (!matchedRealWord)
        matchedRealWord = d.toString().includes(guess)
    })

    fileStream.on('close', () => {
      //Return error message if guess isn't recognised as a word
      if (!matchedRealWord) {
        res.json({
          error: `${guess} is not recognised as a word`
        })
      //Proceed if word is recognised
      } else {
        currentGame.guesses++
        const targetWord = currentGame.targetWord

        let newPastGuess = {
          number: currentGame.guesses,
          word: guess,
          colours: new Array(5).fill(Colour.Grey),
          correct: false
        }

        //Whole word is correct
        if (guess === targetWord) {
          newPastGuess.colours = new Array(5).fill(Colour.Green)
          newPastGuess.correct = true

          //End current game
          activeGames = activeGames.filter(g => g.id !== id)
        //Whole word is not correct
        } else {
          for (let i = 0; i < 5; i++) {
            const targetChar = targetWord.charAt(i)

            //Right letter, right position
            if (guess.charAt(i) === targetChar)
              newPastGuess.colours[i] = Colour.Green
            //Right letter, wrong position
            else if (guess.includes(targetChar))
              newPastGuess.colours[guess.indexOf(targetChar)] = Colour.Yellow
          }
        }

        res.json(newPastGuess)
      }
    })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
