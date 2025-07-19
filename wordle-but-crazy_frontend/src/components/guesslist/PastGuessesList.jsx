import PastGuessWord from "./PastGuessWord"

const PastGuessesList = ({pastGuesses, Colour}) => (
  <table>
    <tbody>
      {pastGuesses.map(pastGuess => <PastGuessWord pastGuess={pastGuess} Colour={Colour} key={pastGuess.number} />)}
    </tbody>
  </table>
)

export default PastGuessesList
