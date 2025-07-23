const Key = ({k, Colour}) => {
  const style = {
    display: 'inline-block'
  }

  switch (k.colour) {
    case Colour.Grey:
      style.color = '#D3D6DA'
      break;
    case Colour.Yellow:
      style.color = '#D1B036'
      break;
    case Colour.Green:
      style.color = '#6AAA64'
      break;
  }

  return (
    <div style={style}>{k.letter}</div>
  )
}

export default Key
