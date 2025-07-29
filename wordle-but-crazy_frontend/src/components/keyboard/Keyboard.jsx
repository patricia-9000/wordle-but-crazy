import styled from 'styled-components'

import Key from './Key'
import EnterKey from './EnterKey'
import BackspaceKey from './BackspaceKey'

const StyledKey = styled.div`
  cursor: pointer;
  font-size: 15pt;
  line-height: 54px;
  color: ${props => props.$thisColour ? 'white' : 'black'};
  width: 39px;
  height: 54px;
  background-color: ${props => {
    if (props.$thisColour)
      return props.$Colour[props.$thisColour]
    else
      return props.$Colour.LightGrey
  }};
  border-width: 2px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${props => {
    if (props.$thisColour)
      return props.$Colour[props.$thisColour]
    else
      return props.$Colour.LightGrey
  }};
  margin: 4px 3px;
  display: inline-block;

  &:hover {
    border-color: black;
  }

  &:active {
    transform: scale(0.9);
  }

  &.highlighted {
    animation: ${props => props.$popAnim} 0.05s linear 1;
  }

  transition: all 50ms;
`

const StyledFunctionKey = styled(StyledKey)`
  font-size: 8pt;
  vertical-align: top;
  width: 64px;
  background-color: ${props => props.$Colour.LightGrey};
  border-color: ${props => props.$Colour.LightGrey};
`

const Keyboard = ({keys, keySelected, Colour, popAnim}) => {
  const row1 = keys.slice(0, 10)
  const row2 = keys.slice(10, 19)
  const row3 = keys.slice(19, 26)

  return (
    <div>
      <div>
        {row1.map((k, i) => <Key
          k={k}
          keySelected={keySelected}
          Colour={Colour}
          StyledKey={StyledKey}
          popAnim={popAnim}
          key={i}
        />)}
      </div>
      <div>
        {row2.map((k, i) => <Key
          k={k}
          keySelected={keySelected}
          Colour={Colour}
          StyledKey={StyledKey}
          popAnim={popAnim}
          key={i}
        />)}
      </div>
      <div>
        <EnterKey
          keySelected={keySelected}
          Colour={Colour}
          StyledFunctionKey={StyledFunctionKey}
        />
        {row3.map((k, i) => <Key
          k={k}
          keySelected={keySelected}
          Colour={Colour}
          StyledKey={StyledKey}
          popAnim={popAnim}
          key={i}
        />)}
        <BackspaceKey
          keySelected={keySelected}
          Colour={Colour}
          StyledFunctionKey={StyledFunctionKey}
        />
      </div>
    </div>
  )
}

export default Keyboard
