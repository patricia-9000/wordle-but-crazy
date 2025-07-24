const Key = ({k, keySelected, Colour, StyledKey}) => {
  return (
    <StyledKey
      $thisColour={k.colour}
      $Colour={Colour}
      onClick={() => keySelected(k.letter)}
    >
      <b>{k.letter.toUpperCase()}</b>
    </StyledKey>
  )
}

export default Key
