import PastGuessWord from "./PastGuessWord"

const PastGuessesList = ({pastGuesses, Colour}) => (
    <table style={{margin: 'auto'}}>
      <tbody>
        {pastGuesses.map(pastGuess => <PastGuessWord pastGuess={pastGuess} Colour={Colour} key={pastGuess.number}/>)}
      </tbody>
    </table>
)

export default PastGuessesList
