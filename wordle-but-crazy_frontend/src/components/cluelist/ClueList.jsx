import styled, {keyframes} from 'styled-components'

import ClueWord from './ClueWord'

const StyledClueList = styled.table`
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 5px 6px;
`

const pop = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`

const StyledClueLetter = styled.td`
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

  &.active {
    animation: ${pop} 0.05s linear 1;
  }
`

const ClueList = ({clues, guessIndex, Colour}) => {
  return(
    <StyledClueList>
      <tbody>
        {clues.map(clue => <ClueWord
          clue={clue}
          guessIndex={guessIndex}
          Colour={Colour}
          StyledClueLetter={StyledClueLetter}
          key={clue.number}
        />)}
      </tbody>
    </StyledClueList>
  )
}

export default ClueList
