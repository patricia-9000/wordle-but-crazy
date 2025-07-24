import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: 15pt;
  line-height: 58px;
  user-select: none;
  color: ${props => props.$thisColour ? 'white' : 'black'};
  width: 43px;
  height: 58px;
  background-color: ${props => {
    if (props.$thisColour)
      return props.$Colour[props.$thisColour]
    else
      return props.$Colour.LightGrey
  }};
  border-radius: 5px;
  margin: 4px 3px;
  display: inline-block;
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
