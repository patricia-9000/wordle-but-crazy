const Key = ({k, Colour}) => {
  const style = {
    fontSize: '15pt',
    lineHeight: '58px',
    width: '43px',
    height: '58px',
    backgroundColor: '#D3D6DA',
    borderRadius: '5px',
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '3px',
    marginRight: '3px',
    display: 'inline-block'
  }

  switch (k.colour) {
    case Colour.Grey:
      style.backgroundColor = '#787C7E'
      style.color = '#FFFFFF'
      break;
    case Colour.Yellow:
      style.backgroundColor = '#D1B036'
      style.color = '#FFFFFF'
      break;
    case Colour.Green:
      style.backgroundColor = '#6AAA64'
      style.color = '#FFFFFF'
      break;
  }

  return (
    <div style={style}>
      <b>{k.letter.toUpperCase()}</b>
    </div>
  )
}

export default Key
