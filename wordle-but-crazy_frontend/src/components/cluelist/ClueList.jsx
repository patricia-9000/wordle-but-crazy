import styled from 'styled-components'

import ClueWord from './ClueWord'

const StyledClueList = styled.table`
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 5px 6px;
`

const StyledClueLetter = styled.td`
  perspective: 1000px;

  .inactiveFlipper, .activeFlipper {
    transition: 500ms;
    transform-style: preserve-3d;
    display: grid;
  }

  .activeFlipper {
    transform: rotateX(180deg);
  }

  .blankFront, .filledFront, .back {
    font-size: 25pt;
    line-height: 56px;
    user-select: none;
    width: 56px;
    height: 56px;
    border-width: 2px;
    border-style: solid;

    backface-visibility: hidden;
    grid-column: 1;
    grid-row: 1;
  }

  .blankFront, .filledFront {
    z-index: 2;
    transform: rotateX(0deg);
  }
  
  .blankFront {
    border-color: ${props => props.$Colour.LightGrey};
  }
  
  .filledFront {
    border-color: ${props => props.$Colour.Grey};
    animation: ${props => props.$popAnim} 0.05s linear 1;
  }

  .back {
    color: white;
    background-color: ${props => props.$Colour[props.$thisColour]};
    border-color: ${props => props.$Colour[props.$thisColour]};
    transform: rotateX(180deg);
  }
`

const ClueList = ({clues, guessIndex, restartState, Colour, popAnim}) => {
  return(
    <StyledClueList>
      <tbody>
        {clues.map(clue => <ClueWord
          clue={clue}
          guessIndex={guessIndex}
          restartState={restartState}
          Colour={Colour}
          StyledClueLetter={StyledClueLetter}
          popAnim={popAnim}
          key={clue.number}
        />)}
      </tbody>
    </StyledClueList>
  )
}

export default ClueList
