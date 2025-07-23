const ClueLetter = ({letter, currentGuess, thisColour, Colour}) => {
  let style = {
    fontSize: '25pt',
    color: '#FFFFFF',
    width: '56px',
    height: '56px',
    backgroundColor: '#FFFFFF',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#D3D6DA'
  }

  if (letter !== ' ') {
    switch (thisColour) {
      case Colour.Grey:
        style.backgroundColor = '#787C7E'
        style.borderColor = '#787C7E'
        break;
      case Colour.Yellow:
        style.backgroundColor = '#D1B036'
        style.borderColor = '#D1B036'
        break;
      case Colour.Green:
        style.backgroundColor = '#6AAA64'
        style.borderColor = '#6AAA64'
        break;
    }

    if (currentGuess) {
      style.color = '#000000'
      style.backgroundColor = '#FFFFFF'
      style.borderColor = '#878A8C'
    }
  }

  return(
    <td style={style}>
      <b>{letter.toUpperCase()}</b>
    </td>
  )
}

export default ClueLetter
