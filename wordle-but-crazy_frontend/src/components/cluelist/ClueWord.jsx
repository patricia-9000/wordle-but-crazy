import ClueLetter from './ClueLetter'

const ClueWord = ({clue, guessIndex, Colour, StyledClueLetter, popAnim}) => {
  const word = clue.word.split('')
  const colours = clue.colours
  const active = guessIndex > clue.number

  return(
    <tr>
      {word.map((letter, i) => <ClueLetter
        letter={letter}
        active={active}
        thisColour={colours[i]}
        Colour={Colour}
        StyledClueLetter={StyledClueLetter}
        popAnim={popAnim}
        key={i}
      />)}
    </tr>
  )
}

export default ClueWord
