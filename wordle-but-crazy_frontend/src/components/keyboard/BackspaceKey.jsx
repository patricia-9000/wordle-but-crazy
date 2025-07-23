const BackspaceKey = ({keySelected}) => {
  const style = {
    fontSize: '8pt',
    verticalAlign: 'top',
    lineHeight: '58px',
    userSelect: 'none',
    width: '64px',
    height: '58px',
    backgroundColor: '#D3D6DA',
    borderRadius: '5px',
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '3px',
    marginRight: '3px',
    display: 'inline-block'
  }

  return (
    <div
      style={style}
      onClick={() => keySelected('Backspace')}
    >
      <b>BKSP</b>
    </div>
  )
}

export default BackspaceKey
