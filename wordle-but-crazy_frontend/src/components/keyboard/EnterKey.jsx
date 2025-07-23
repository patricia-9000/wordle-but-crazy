const EnterKey = ({keySelected}) => {
  const style = {
    cursor: 'pointer',
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
      onClick={() => keySelected('Enter')}
    >
      <b>ENTER</b>
    </div>
  )
}

export default EnterKey
