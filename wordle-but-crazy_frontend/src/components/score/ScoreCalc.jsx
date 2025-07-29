import styled from 'styled-components'

const TileScore = styled.div`
  user-select: none;
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
`

const ScoreCalc = ({clues, guessIndex, Colour}) => {
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
        $thisColour={t.colour}
        $Colour={Colour}
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
}

export default ScoreCalc
