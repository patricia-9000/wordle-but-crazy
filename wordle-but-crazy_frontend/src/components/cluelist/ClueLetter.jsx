const ClueLetter = ({letter, currentGuess, thisColour, Colour}) => {
  let style = {
    width: '56px',
    height: '56px',
    fontSize: '25pt',
    backgroundColor: '#FFFFFF',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#D3D6DA'
  }

  if (letter !== ' ') {
    letter = letter.toUpperCase()

    switch (thisColour) {
      case Colour.Grey:
        style.backgroundColor = '#D3D6DA'
        style.borderColor = '#D3D6DA'
        break;
      case Colour.Yellow:
        style.backgroundColor = '#D1B036'
        style.borderColor = '#D1B036'
        style.color = '#FFFFFF'
        break;
      case Colour.Green:
        style.backgroundColor = '#6AAA64'
        style.borderColor = '#6AAA64'
        style.color = '#FFFFFF'
        break;
    }

    if (currentGuess) {
      style.backgroundColor = '#FFFFFF'
      style.borderColor = '#878A8C'
    }
  }

  return(
    <td style={style}>
      <b>{letter}</b>
    </td>
  )
}

export default ClueLetter
