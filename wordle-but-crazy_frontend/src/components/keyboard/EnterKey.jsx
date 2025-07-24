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

const EnterKey = ({keySelected}) => {
  return (
    <StyledDiv onClick={() => keySelected('Enter')}>
      <b>ENTER</b>
    </StyledDiv>
  )
}

export default EnterKey
