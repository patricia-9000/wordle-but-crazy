import styled from "styled-components"

import ScoreDisplay from './ScoreDisplay'
import ScoreCalc from './ScoreCalc'

const StyledDiv = styled.div`
  margin: 50px 0;
  position: absolute;
  right: 0;
`

const ScoreSidebar = ({ highScore, wordScore, clues, guessIndex, showWordScore, showPoints, showScoreMult, highScoreUpdated, popAnim, Colour}) => {
  return (
    <StyledDiv>
      <ScoreDisplay
        highScore={highScore}
        wordScore={wordScore}
        showWordScore={showWordScore}
        showPoints={showPoints}
        showScoreMult={showScoreMult}
        highScoreUpdated={highScoreUpdated}
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
