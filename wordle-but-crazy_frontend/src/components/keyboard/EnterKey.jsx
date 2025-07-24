import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: 8pt;
  vertical-align: top;
  line-height: 54px;
  user-select: none;
  width: 60px;
  height: 54px;
  background-color: ${props => props.$Colour.LightGrey};
  border-width: 2px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${props => props.$Colour.LightGrey};
  margin: 4px 3px;
  display: inline-block;

  &:hover {
    border-color: black;
  }

  &:active {
    background-color: white;
  }
`

const EnterKey = ({keySelected, Colour}) => {
  return (
    <StyledDiv $Colour={Colour}
    onClick={() => keySelected('Enter')}>
      <b>ENTER</b>
    </StyledDiv>
  )
}

export default EnterKey
