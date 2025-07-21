import ClueLetter from './ClueLetter'

const ClueWord = ({clue, Colour}) => {
  const word = clue.word.split('')
  const colours = clue.colours

  return(
    <tr>
      {word.map((letter, i) => <ClueLetter letter={letter} thisColour={colours[i]} Colour={Colour} key={i}/>)}
    </tr>
  )
}

export default ClueWord
