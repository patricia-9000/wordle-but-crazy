import styled from "styled-components"

import ScoreDisplay from './ScoreDisplay'
import ScoreCalc from './ScoreCalc'

const StyledDiv = styled.div`
  margin: 50px 0;
  position: absolute;
  right: 0;
`

const ScoreSidebar = ({score, wordScore, clues, guessIndex, Colour}) => {
  return (
    <StyledDiv>
      <ScoreDisplay score={score} wordScore={wordScore}/>
      <ScoreCalc clues={clues} guessIndex={guessIndex} Colour={Colour}/>
    </StyledDiv>
  )
}

export default ScoreSidebar
