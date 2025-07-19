const PastGuessLetter = ({letter, thisColour, Colour}) => {
  let letterStyle = {}

  switch (thisColour) {
    case Colour.Grey:
      letterStyle.color = 'grey'
      break;
    case Colour.Yellow:
      letterStyle.color = '#D1B036'
      break;
    case Colour.Green:
      letterStyle.color = '#6AAA64'
      break;
  }

  return(
    <td style={letterStyle}>
      {letter}
    </td>
  )
}

export default PastGuessLetter
