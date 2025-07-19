const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const nthline = require('nthline')

const FIVE_LETTER_WORDS = 3103

const Colour = {
  Grey: 'Grey',
  Yellow: 'Yellow',
  Green: 'Green'
}

let guesses = 0

const wordNumber = Math.floor(Math.random() * FIVE_LETTER_WORDS)
let targetWord = ''
nthline(wordNumber, './WORDS')
  .then(word => targetWord = word)

app.post('/api/makeguess', (req, res) => {
  const guess = req.body.word
  guesses ++

  let newPastGuess = {
    number: guesses,
    word: guess,
    colours: new Array(5).fill(Colour.Grey),
    correct: false
  }

  if (guess === targetWord) {
    newPastGuess.colours = new Array(5).fill(Colour.Green)
    newPastGuess.correct = true
  } else {
    for (let i = 0; i < 5; i++) {
      const targetChar = targetWord.charAt(i)

      if (guess.charAt(i) === targetChar)
        newPastGuess.colours[i] = Colour.Green
      else if (guess.includes(targetChar))
        newPastGuess.colours[guess.indexOf(targetChar)] = Colour.Yellow
    }
  }

  res.json(newPastGuess)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
