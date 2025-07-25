const ClueLetter = ({letter, active, thisColour, restartState, firstRow, index, Colour, StyledClueLetter, popAnim}) => {
  const displayLetterBack = letter.toUpperCase()
  let displayLetterFront = displayLetterBack

  if (restartState.restarting) {
    if (firstRow)
      displayLetterFront = restartState.firstWord[index].toUpperCase()
    else
      displayLetterFront = ' '
  }

  return(
    <StyledClueLetter
      $letter={letter}
      $thisColour={thisColour}
      $Colour={Colour}
      $popAnim={popAnim}
    >
      <div className={
        restartState.restarting ? 'inactiveFlipper' : (
          active ? 'activeFlipper' : 'inactiveFlipper'
      )}>
        <div className={
          restartState.restarting ? 'blankFront' : (
            letter === ' ' ? 'blankFront' : 'filledFront'
        )}>
          <b>{displayLetterFront}</b>
        </div>
        <div className='back'>
          <b>{displayLetterBack}</b>
        </div>
      </div>
    </StyledClueLetter>
  )
}

export default ClueLetter
