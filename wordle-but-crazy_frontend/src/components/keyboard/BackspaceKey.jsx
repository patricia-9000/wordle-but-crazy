import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: 8pt;
  vertical-align: top;
  line-height: 58px;
  user-select: none;
  width: 64px;
  height: 58px;
  background-color: #D3D6DA;
  border-radius: 5px;
  margin: 4px 3px;
  display: inline-block;
`

const BackspaceKey = ({keySelected}) => {
  return (
    <StyledDiv onClick={() => keySelected('Backspace')}>
      <b>BKSP</b>
    </StyledDiv>
  )
}

export default BackspaceKey
