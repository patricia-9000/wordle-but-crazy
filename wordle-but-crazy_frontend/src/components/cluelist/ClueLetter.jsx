const ClueLetter = ({letter, active, thisColour, Colour, StyledClueLetter, popAnim}) => {
  return(
    <StyledClueLetter
      $letter={letter}
      $thisColour={thisColour}
      $Colour={Colour}
      $popAnim={popAnim}
    >
      <div className={active ? 'activeFlipper' : 'inactiveFlipper'}>
        <div className={letter === ' ' ? 'blankFront' : 'filledFront'}>
          <b>{letter.toUpperCase()}</b>
        </div>
        <div className='back'>
          <b>{letter.toUpperCase()}</b>
        </div>
      </div>
    </StyledClueLetter>
  )
}

export default ClueLetter
