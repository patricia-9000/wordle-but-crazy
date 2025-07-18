const CorrectIncorrectMessage = ({GameState, currentGameState}) => {
  let message = ''

  if (currentGameState === GameState.Correct)
    message = 'Correct!'
  else if (currentGameState === GameState.Incorrect)
    message = 'Incorrect'

  return(
    <div>{message}</div>
  )
}

export default CorrectIncorrectMessage
