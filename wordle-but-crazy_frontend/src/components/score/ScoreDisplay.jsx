import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: right;

  .scoreDisplay, .hiddenScoreDisplay, .popScoreDisplay {
    margin: 25px;
  }

  .hiddenScoreDisplay {
    visibility: hidden;
  }

  .popScoreDisplay {
    animation: ${props => props.$popAnim} 0.05s linear 1;
  }

  @property --num {
    syntax: "<integer>";
    initial-value: 0;
    inherits: false;
  }

  .highScore, .wordScore {
    font-size: 30pt;
  }

  .wordScore {
    --num: ${props => props.$wordScore};
    transition: --num 0.5s;
    counter-set: num var(--num);
  }

  .wordScore::after {
    content: counter(num);
  }
`

const ScoreDisplay = ({highScore, wordScore, showWordScore, showPoints, showScoreMult, highScoreUpdated, popAnim}) => {
  let highScoreClassName = 'hiddenScoreDisplay'
  let wordScoreClassName = 'hiddenScoreDisplay'

  if (showWordScore) {
    wordScoreClassName = 'scoreDisplay'

    if (showPoints || showScoreMult)
      wordScoreClassName = 'popScoreDisplay'
  }

  if (highScore !== 0) {
    highScoreClassName = 'scoreDisplay'

    if (highScoreUpdated)
      highScoreClassName = 'popScoreDisplay'
  }
  
  return (
    <StyledDiv
      $highScore={highScore}
      $wordScore={wordScore}
      $popAnim={popAnim}
    >
      <div className={highScoreClassName}>
        <div>
          <b>High Score</b>
        </div>
        <b className='highScore'>{highScore}</b>
      </div>
      <div className={wordScoreClassName}>
        <div>
          <b>Score</b>
        </div>
        <b className='wordScore'/>
      </div>
    </StyledDiv>
  )
}

export default ScoreDisplay
