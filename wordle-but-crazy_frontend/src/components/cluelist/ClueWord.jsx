import ClueLetter from './ClueLetter'

const ClueWord = ({clue, guessIndex, restartState, Colour, StyledClueLetter, popAnim}) => {
  const word = clue.word.split('')
  const colours = clue.colours
  const active = guessIndex > clue.number
  const firstRow = (clue.number === 0)

  return(
    <tr>
      {word.map((letter, i) => <ClueLetter
        letter={letter}
        active={active}
        thisColour={colours[i]}
        restartState={restartState}
        firstRow={firstRow}
        index={i}
        Colour={Colour}
        StyledClueLetter={StyledClueLetter}
        popAnim={popAnim}
        key={i}
      />)}
    </tr>
  )
}

export default ClueWord
