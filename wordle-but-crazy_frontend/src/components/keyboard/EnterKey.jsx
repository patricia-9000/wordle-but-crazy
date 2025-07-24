const EnterKey = ({keySelected, Colour, StyledFunctionKey}) => {
  return (
    <StyledFunctionKey
      $Colour={Colour}
      onClick={() => keySelected('Enter')}
    >
      <b>ENTER</b>
    </StyledFunctionKey>
  )
}

export default EnterKey
