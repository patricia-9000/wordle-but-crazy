const GuessInputBox = ({guess, updateGuess, makeGuess}) => {
  let buttonDisabled = !(guess.length === 5)

  return(
    <form onSubmit={makeGuess}>
      <input
        value={guess}
        onChange={updateGuess}
      />
      <button type='submit' disabled={buttonDisabled}>Make Guess</button>
    </form>
  )
}

export default GuessInputBox
