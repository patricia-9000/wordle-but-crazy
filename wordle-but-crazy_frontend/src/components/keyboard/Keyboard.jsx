import Key from './Key'

const Keyboard = ({keys, Colour}) => {
  const row1 = keys.slice(0, 10)
  const row2 = keys.slice(10, 19)
  const row3 = keys.slice(19, 26)

  return (
    <div>
      <div>
        {row1.map((k, i) => <Key k={k} Colour={Colour} key={i}/>)}
      </div>
      <div>
        {row2.map((k, i) => <Key k={k} Colour={Colour} key={i}/>)}
      </div>
      <div>
        {row3.map((k, i) => <Key k={k} Colour={Colour} key={i}/>)}
      </div>
    </div>
  )
}

export default Keyboard
