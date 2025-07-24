const BackspaceKey = ({keySelected, Colour, StyledFunctionKey}) => {
  return (
    <StyledFunctionKey
      $Colour={Colour}
      onClick={() => keySelected('Backspace')}
    >
      <b>BKSP</b>
    </StyledFunctionKey>
  )
}

export default BackspaceKey
