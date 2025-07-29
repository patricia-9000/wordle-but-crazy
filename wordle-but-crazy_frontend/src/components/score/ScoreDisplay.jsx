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

  .score, .wordScore {
    font-size: 30pt;

    transition: --num 0.5s;
    counter-set: num var(--num);
  }

  .score {
    --num: ${props => props.$score};
  }

  .wordScore {
    --num: ${props => props.$wordScore};
  }

  .score::after, .wordScore::after {
    content: counter(num);
  }
`

const ScoreDisplay = ({score, wordScore, showPoints, showScoreMult, popAnim}) => {
  let scoreClassName = 'hiddenScoreDisplay'
  let wordScoreClassName = 'hiddenScoreDisplay'

  if (score !== 0) {
    scoreClassName = 'scoreDisplay'
    wordScoreClassName = 'scoreDisplay'

    if (!showScoreMult)
      scoreClassName = 'popScoreDisplay'
  } else if (wordScore !== 0)
    wordScoreClassName = 'scoreDisplay'
  
  if (showPoints || showScoreMult)
    wordScoreClassName = 'popScoreDisplay'
  
  return (
    <StyledDiv
      $score={score}
      $wordScore={wordScore}
      $popAnim={popAnim}
    >
      <div className={scoreClassName}>
        <div>
          <b>Score</b>
        </div>
        <b className='score'/>
      </div>
      <div className={wordScoreClassName}>
        <div>
          <b>Round Score</b>
        </div>
        <b className='wordScore'/>
      </div>
    </StyledDiv>
  )
}

export default ScoreDisplay
