import styled from 'styled-components'

const StyledDiv = styled.div`
  font-size: 15pt;
  user-select: none;
  color: white;
  width: max-content;
  height: 23px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => {
    if (props.$statusMessage === '')
      return 'white'
    else
      return 'black'
  }};
  margin: 20px auto;
`

const StatusMessageLabel = ({statusMessage}) => {
  return (
    <StyledDiv $statusMessage={statusMessage}>
      {statusMessage}
    </StyledDiv>
  )
}

export default StatusMessageLabel
