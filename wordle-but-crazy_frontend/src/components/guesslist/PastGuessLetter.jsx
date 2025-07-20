const PastGuessLetter = ({letter, thisColour, Colour}) => {
  let style = {
    width: '56px',
    height: '56px',
    fontSize: '25pt',
    backgroundColor: '#D3D6DA',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#D3D6DA'
  }

  switch (thisColour) {
    case Colour.Yellow:
      style.backgroundColor = '#D1B036'
      style.borderColor = '#D1B036'
      style.color = 'white'
      break;
    case Colour.Green:
      style.backgroundColor = '#6AAA64'
      style.borderColor = '#6AAA64'
      style.color = 'white'
      break;
  }

  if (letter === ' ')
    style.backgroundColor = 'white'
  else
    letter = letter.toUpperCase()

  return(
    <td style={style}>
      <b>{letter}</b>
    </td>
  )
}

export default PastGuessLetter
