import PastGuessWord from "./PastGuessWord"

const PastGuessesList = ({pastGuesses, Colour}) => {
  const style = {
    margin: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '5px'
  }

  return(
    <table style={style}>
      <tbody>
        {pastGuesses.map(pastGuess => <PastGuessWord pastGuess={pastGuess} Colour={Colour} key={pastGuess.number}/>)}
      </tbody>
    </table>
  )
}

export default PastGuessesList
