const ClueLetter = ({letter, currentGuess, thisColour, Colour, StyledClueLetter, popAnim}) => {
  return(
    <StyledClueLetter
      className={letter === ' ' ? 'blank' : 'active'}
      $letter={letter}
      $currentGuess={currentGuess}
      $thisColour={thisColour}
      $Colour={Colour}
      $popAnim={popAnim}
    >
      <b>{letter.toUpperCase()}</b>
    </StyledClueLetter>
  )
}

export default ClueLetter
