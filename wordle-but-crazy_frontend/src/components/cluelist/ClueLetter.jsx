import styled from 'styled-components'

const StyledTd = styled.td`
  font-size: 25pt;
  user-select: none;
  color: ${props => props.$currentGuess ? 'black' : 'white'};
  width: 56px;
  height: 56px;
  background-color: ${props => {
    if (props.$letter === ' ' || props.$currentGuess)
      return 'white'
    else
      return props.$Colour[props.$thisColour]
  }};
  border-width: 2px;
  border-style: solid;
  border-color: ${props => {
    if (props.$letter === ' ')
      return props.$Colour.LightGrey
    else if (props.$currentGuess)
      return props.$Colour.Grey
    else
      return props.$Colour[props.$thisColour]
  }};
`

const ClueLetter = ({letter, currentGuess, thisColour, Colour}) => {
  return(
    <StyledTd $letter={letter} $currentGuess={currentGuess} $thisColour={thisColour} $Colour={Colour}>
      <b>{letter.toUpperCase()}</b>
    </StyledTd>
  )
}

export default ClueLetter
