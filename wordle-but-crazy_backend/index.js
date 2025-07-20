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

//Choose new random target word
function chooseWord() {
  const wordNumber = Math.floor(Math.random() * FIVE_LETTER_WORDS)
  nthline(wordNumber, WORDS_FILEPATH)
    .then(word => {
      targetWord = word
      console.log(`New target word: ${word}`)
    })
}

let targetWord = chooseWord()
let guesses = 0

//Reset game
app.get('/api/reset', (req, res) => {
  targetWord = chooseWord()
  guesses = 0
  res.status(200).end()
})

//Handle incoming guessed word
app.post('/api/makeguess', (req, res) => {
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
    //Proceed with generating clues if word is recognised
    } else {
      guesses++

      let newPastGuess = {
        number: guesses,
        word: guess,
        colours: new Array(5).fill(Colour.Grey),
        correct: false
      }

      //Whole word is correct
      if (guess === targetWord) {
        newPastGuess.colours = new Array(5).fill(Colour.Green)
        newPastGuess.correct = true
        targetWord = chooseWord()
        guesses = 0
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
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
