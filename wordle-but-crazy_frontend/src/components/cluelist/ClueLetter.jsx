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
    else {
      switch (props.$thisColour) {
        case props.$Colour.Grey:
          return '#787C7E'
        case props.$Colour.Yellow:
          return '#D1B036'
        case props.$Colour.Green:
          return '#6AAA64'
      }
    }
  }};
  border-width: 2px;
  border-style: solid;
  border-color: ${props => {
    if (props.$letter === ' ')
      return '#D3D6DA'
    else if (props.$currentGuess)
      return '#878A8C'
    else {
      switch (props.$thisColour) {
        case props.$Colour.Grey:
          return '#787C7E'
        case props.$Colour.Yellow:
          return '#D1B036'
        case props.$Colour.Green:
          return '#6AAA64'
      }
    }
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
