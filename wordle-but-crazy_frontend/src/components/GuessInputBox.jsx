const GuessInputBox = ({guess, setGuess, makeGuess}) => {
  return(
    <form onSubmit={makeGuess}>
      <input
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
      />
      <button type='submit'>Make Guess</button>
    </form>
  )
}

export default GuessInputBox
