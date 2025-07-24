import ClueLetter from './ClueLetter'

const ClueWord = ({clue, guessIndex, Colour, StyledClueLetter}) => {
  const word = clue.word.split('')
  const colours = clue.colours
  const currentGuess = clue.number === guessIndex

  return(
    <tr>
      {word.map((letter, i) => <ClueLetter
        letter={letter}
        currentGuess={currentGuess}
        thisColour={colours[i]}
        Colour={Colour}
        StyledClueLetter={StyledClueLetter}
        key={i}
      />)}
    </tr>
  )
}

export default ClueWord
