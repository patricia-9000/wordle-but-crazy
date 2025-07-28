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

  .number {
    font-size: 30pt;
  }
`

const ScoreDisplay = ({score, wordScore}) => {
  return (
    <StyledDiv>
      <div className='scoreDisplay'>
        <div>
          <b>Score</b>
        </div>
        <div className='number'>
          <b>{score}</b>
        </div>
      </div>
      <div className='scoreDisplay'>
        <div>
          <b>Word Score</b>
        </div>
        <div className='number'>
          <b>{wordScore}</b>
        </div>
      </div>
    </StyledDiv>
  )
}

export default ScoreDisplay
