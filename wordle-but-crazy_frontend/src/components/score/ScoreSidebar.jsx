import styled from "styled-components"

import ScoreDisplay from './ScoreDisplay'
import ScoreCalc from './ScoreCalc'

const StyledDiv = styled.div`
  margin: 50px 0;
  position: absolute;
  right: 0;
`

const ScoreSidebar = ({score, wordScore, clues, guessIndex, showWordScore, showPoints, showScoreMult, popAnim, Colour}) => {
  return (
    <StyledDiv>
      <ScoreDisplay
        score={score}
        wordScore={wordScore}
        showWordScore={showWordScore}
        showPoints={showPoints}
        showScoreMult={showScoreMult}
        popAnim={popAnim}
      />
      <ScoreCalc
        clues={clues}
        guessIndex={guessIndex}
        showPoints={showPoints}
        showScoreMult={showScoreMult}
        popAnim={popAnim}
        Colour={Colour}
      />
    </StyledDiv>
  )
}

export default ScoreSidebar
