import styled from 'styled-components'

const StyledDiv = styled.div`
  font-size: 15pt;
  user-select: none;
  color: white;
  width: max-content;
  height: 23px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.$showStatusMessage ? 'black' : 'white'};
  margin: 20px auto;

  transition: all 100ms;
`

const StatusMessageLabel = ({statusMessage, showStatusMessage}) => {
  return (
    <StyledDiv $showStatusMessage={showStatusMessage}>
      {statusMessage}
    </StyledDiv>
  )
}

export default StatusMessageLabel
