const Key = ({k, keySelected, Colour, StyledKey}) => {
  return (
    <StyledKey className={k.colour ? 'highlighted' : 'default'}
      $thisColour={k.colour}
      $Colour={Colour}
      onClick={() => keySelected(k.letter)}
    >
      <b>{k.letter.toUpperCase()}</b>
    </StyledKey>
  )
}

export default Key
