import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: right;

  .scoreDisplay, .hiddenScoreDisplay {
    margin: 25px;
  }

  .hiddenScoreDisplay {
    visibility: hidden;
  }

  .scoreDisplay {
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

const ScoreDisplay = ({score, wordScore, popAnim}) => {
  return (
    <StyledDiv
      $score={score}
      $wordScore={wordScore}
      $popAnim={popAnim}
    >
      <div className={score !== 0 ? 'scoreDisplay' : 'hiddenScoreDisplay'}>
        <div>
          <b>Score</b>
        </div>
        <b className='score'/>
      </div>
      <div className={wordScore !== 0 || score !== 0 ? 'scoreDisplay' : 'hiddenScoreDisplay'}>
        <div>
          <b>Round Score</b>
        </div>
        <b className='wordScore'/>
      </div>
    </StyledDiv>
  )
}

export default ScoreDisplay
