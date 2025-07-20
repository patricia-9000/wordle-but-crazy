const GuessInputBox = ({guess, updateGuess, makeGuess, guessingDisabled}) => {
  let buttonDisabled = !(guess.length === 5) || guessingDisabled

  return(
    <form
      style={{ margin: '5px' }}
      onSubmit={makeGuess}
    >
      <input
        value={guess}
        onChange={updateGuess}
        disabled={guessingDisabled}
      />
      <button type='submit' disabled={buttonDisabled} hidden={true}>Make Guess</button>
    </form>
  )
}

export default GuessInputBox
