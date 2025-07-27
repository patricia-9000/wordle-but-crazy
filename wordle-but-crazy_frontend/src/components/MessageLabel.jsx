import styled from 'styled-components'

const StyledDiv = styled.div`
  font-size: 15pt;
  user-select: none;
  color: white;
  width: max-content;
  height: 23px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.$showMessage ? 'black' : 'white'};
  margin: 0 auto;

  transition: all 100ms;
`

const MessageLabel = ({message, showMessage}) => {
  return (
    <StyledDiv $showMessage={showMessage}>
      {message}
    </StyledDiv>
  )
}

export default MessageLabel
