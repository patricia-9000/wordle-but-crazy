import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: 15pt;
  line-height: 54px;
  user-select: none;
  color: ${props => props.$thisColour ? 'white' : 'black'};
  width: 39px;
  height: 54px;
  background-color: ${props => {
    if (props.$thisColour)
      return props.$Colour[props.$thisColour]
    else
      return props.$Colour.LightGrey
  }};
  border-width: 2px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${props => {
    if (props.$thisColour)
      return props.$Colour[props.$thisColour]
    else
      return props.$Colour.LightGrey
  }};
  margin: 4px 3px;
  display: inline-block;

  &:hover {
    border-color: black;
  }

  &:active {
    color: black;
    background-color: white;
  }
`

const Key = ({k, keySelected, Colour}) => {
  return (
    <StyledDiv
      $thisColour={k.colour} $Colour={Colour}
      onClick={() => keySelected(k.letter)}
    >
      <b>{k.letter.toUpperCase()}</b>
    </StyledDiv>
  )
}

export default Key
