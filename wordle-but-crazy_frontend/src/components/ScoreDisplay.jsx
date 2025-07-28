import styled from "styled-components"

const StyledDiv = styled.div`
  text-align: right;
  user-select: none;
  position: absolute;
  inset-inline-end: 50px;
  inset-block-start: 50px;

  .scoreDisplay {
    margin: 25px;
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

const ScoreDisplay = ({score, wordScore}) => {
  return (
    <StyledDiv
      $score={score}
      $wordScore={wordScore}
    >
      <div className='scoreDisplay'>
        <div>
          <b>Score</b>
        </div>
        <b className='score'/>
      </div>
      <div className='scoreDisplay'>
        <div>
          <b>Word Score</b>
        </div>
        <b className='wordScore'/>
      </div>
    </StyledDiv>
  )
}

export default ScoreDisplay
