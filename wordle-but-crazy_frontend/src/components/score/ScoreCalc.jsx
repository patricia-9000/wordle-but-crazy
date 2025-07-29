import styled from 'styled-components'

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

const ScoreMult = styled.div`
  text-align: right;

  .multiplier {
    font-size: 30pt;
  }

  .multiplier, .linesLeft {
    margin: 0 25px;
  }

  animation: ${props => props.$popAnim} 0.05s linear 1;
`

const ScoreCalc = ({clues, guessIndex, showPoints, showScoreMult, popAnim, Colour}) => {
  //Render the tile point additions
  if (!showScoreMult) {
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

    return (
      <div>
        {scoredTiles.map((t, i) => 
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
      </div>
    )
  //Render the spare lines point multiplier
  } else {
    const linesLeft = 6 - guessIndex

    if (linesLeft !== 0) {
      return (
        <ScoreMult
          $popAnim={popAnim}
        >
          <div className='multiplier'>
            <b>x{7 - guessIndex}</b>
          </div>
          <div className='linesLeft'>
            <b>{linesLeft} line{linesLeft === 1 ? '' : 's'} left</b>
          </div>
        </ScoreMult>
      )
    }
  }
}

export default ScoreCalc
