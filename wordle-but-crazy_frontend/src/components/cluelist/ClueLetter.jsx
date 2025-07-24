const ClueLetter = ({letter, currentGuess, thisColour, Colour, StyledClueLetter}) => {
  return(
    <StyledClueLetter
      $letter={letter}
      $currentGuess={currentGuess}
      $thisColour={thisColour}
      $Colour={Colour}
    >
      <b>{letter.toUpperCase()}</b>
    </StyledClueLetter>
  )
}

export default ClueLetter
