import PastGuessLetter from "./PastGuessLetter"

const PastGuessWord = ({pastGuess, Colour}) => {
  const guess = pastGuess.word.split('')
  const colours = pastGuess.colours

  return(
    <tr>
      {guess.map((letter, i) => <PastGuessLetter letter={letter} thisColour={colours[i]} Colour={Colour} key={i}/>)}
    </tr>
  )
}

export default PastGuessWord
