import ClueWord from './ClueWord'

const ClueList = ({clues, guessIndex, Colour}) => {
  const style = {
    margin: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '5px'
  }

  return(
    <table style={style}>
      <tbody>
        {clues.map(clue => <ClueWord clue={clue} guessIndex={guessIndex} Colour={Colour} key={clue.number}/>)}
      </tbody>
    </table>
  )
}

export default ClueList
