import styled from 'styled-components'

//Contain both tile scoring and mult scoring together
//  overlapping by placing them within the same grid cell
const CalcContainer = styled.div`
  display: grid;
`

const TileScoreContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
`

const TileScore = styled.div`
  margin: 15px auto;

  .points, .letter {
    display: inline-block;
  }

  .points {
    margin: 10px;
  }

  .letter {
    color: white;
    line-height: 40px;
    width: 40px;
    height: 40px;
    background-color: ${props => props.$Colour[props.$thisColour]};
  }

  &.showPoints {
    animation: ${props => props.$popAnim} 0.05s linear 1;
  }

  &.hidePoints {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s ease-in;
  }
`

const MultScore = styled.div`
  text-align: right;
  grid-column: 1;
  grid-row: 1;

  .multiplier {
    font-size: 30pt;
  }

  .multiplier, .linesLeft {
    margin: 0 25px;
  }

  &.showMult {
    animation: ${props => props.$popAnim} 0.05s linear 1;
  }

  &.hideMult {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s ease-in;
  }
`

const ScoreCalc = ({clues, guessIndex, showPoints, showScoreMult, popAnim, Colour}) => {
  //Generate data for rendering scoring from letter tiles
  let scoredTiles = []

  if (guessIndex > 0) {
    for (let i = 0; i < 5; i ++) {
      const thisColour = clues[guessIndex - 1].colours[i]
      
      switch (thisColour) {
        case 'Yellow':
          scoredTiles.push({
            colour: thisColour,
            letter: clues[guessIndex - 1].word[i],
            points: '+10'
          })
          break;
        case 'Green':
          scoredTiles.push({
            colour: thisColour,
            letter: clues[guessIndex - 1].word[i],
            points: '+50'
          })
          break;
      }
    }
  }

  const linesLeft = 6 - guessIndex

  return (
    <CalcContainer>
      {/* Render scoring from letter tiles */}
      <TileScoreContainer>
        {showScoreMult ? <div></div> : scoredTiles.map((t, i) => 
        <TileScore
          className={showPoints ? 'showPoints' : 'hidePoints'}
          $thisColour={t.colour}
          $Colour={Colour}
          $popAnim={popAnim}
          key={i}
        >
          <div className='points'>
            <b>{t.points}</b>
          </div>
          <div className='letter'>
            <b>{t.letter.toUpperCase()}</b>
          </div>
        </TileScore>)}
      </TileScoreContainer>
      {/* Render score multiplication from left over lines */}
      <MultScore
        className={showScoreMult ? 'showMult' : 'hideMult'}
        $popAnim={popAnim}
      >
        <div className='multiplier'>
          <b>x{2 ** linesLeft}</b>
        </div>
        <div className='linesLeft'>
          <b>{linesLeft} line{linesLeft === 1 ? '' : 's'} left</b>
        </div>
      </MultScore>
    </CalcContainer>
  )
}

export default ScoreCalc
