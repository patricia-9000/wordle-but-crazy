import styled from 'styled-components'

import Key from './Key'
import EnterKey from './EnterKey'
import BackspaceKey from './BackspaceKey'

const StyledDiv = styled.div`
  margin: 20px 0;
`

const Keyboard = ({keys, keySelected, Colour}) => {
  const row1 = keys.slice(0, 10)
  const row2 = keys.slice(10, 19)
  const row3 = keys.slice(19, 26)

  return (
    <StyledDiv>
      <div>
        {row1.map((k, i) => <Key k={k} keySelected={keySelected} Colour={Colour} key={i}/>)}
      </div>
      <div>
        {row2.map((k, i) => <Key k={k} keySelected={keySelected} Colour={Colour} key={i}/>)}
      </div>
      <div>
        <EnterKey keySelected={keySelected} Colour={Colour}/>
        {row3.map((k, i) => <Key k={k} keySelected={keySelected} Colour={Colour} key={i}/>)}
        <BackspaceKey keySelected={keySelected} Colour={Colour} />
      </div>
    </StyledDiv>
  )
}

export default Keyboard
