import Key from './Key'
import EnterKey from './EnterKey'
import BackspaceKey from './BackspaceKey'

const Keyboard = ({keys, keySelected, Colour}) => {
  const row1 = keys.slice(0, 10)
  const row2 = keys.slice(10, 19)
  const row3 = keys.slice(19, 26)

  const style = {
    marginTop: '20px'
  }

  return (
    <div style={style}>
      <div>
        {row1.map((k, i) => <Key k={k} keySelected={keySelected} Colour={Colour} key={i}/>)}
      </div>
      <div>
        {row2.map((k, i) => <Key k={k} keySelected={keySelected} Colour={Colour} key={i}/>)}
      </div>
      <div>
        <EnterKey/>
        {row3.map((k, i) => <Key k={k} keySelected={keySelected} Colour={Colour} key={i}/>)}
        <BackspaceKey/>
      </div>
    </div>
  )
}

export default Keyboard
