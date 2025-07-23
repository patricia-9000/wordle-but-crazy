const StatusMessageLabel = ({statusMessage}) => {
  const style = {
    fontSize: '15pt',
    userSelect: 'none',
    color: 'white',
    width: 'max-content',
    height: '23px',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: 'black',
    margin: 'auto',
    marginTop: '5px',
    marginBottom: '5px'
  }

  if (statusMessage === '')
    style.backgroundColor = 'white'

  return (
    <div style={style}>{statusMessage}</div>
  )
}

export default StatusMessageLabel
