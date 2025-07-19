const express = require('express')
const app = express()
app.use(express.json())

const Colour = {
  Grey: 'Grey',
  Yellow: 'Yellow',
  Green: 'Green'
}

let guesses = 0
let targetWord = 'horse'

app.post('/api/makeguess', (req, res) => {
  const guess = req.body.word
  guesses ++

  let newPastGuess = {
    number: guesses,
    word: guess,
    colours: new Array(5).fill(Colour.Grey)
  }

  if (guess === targetWord)
    newPastGuess.colours = new Array(5).fill(Colour.Green)
  else {
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
