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
    switch (props.$thisColour) {
      case props.$Colour.Grey:
        return '#787C7E'
      case props.$Colour.Yellow:
        return '#D1B036'
      case props.$Colour.Green:
        return '#6AAA64'
      default:
        return '#D3D6DA'
    }
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
