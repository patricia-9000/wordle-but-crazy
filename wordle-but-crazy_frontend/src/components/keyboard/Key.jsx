const Key = ({k, keySelected, Colour, StyledKey, popAnim}) => {
  return (
    <StyledKey
      className={k.colour ? 'highlighted' : 'default'}
      $thisColour={k.colour}
      $Colour={Colour}
      $popAnim={popAnim}
      onClick={() => keySelected(k.letter)}
    >
      <b>{k.letter.toUpperCase()}</b>
    </StyledKey>
  )
}

export default Key
