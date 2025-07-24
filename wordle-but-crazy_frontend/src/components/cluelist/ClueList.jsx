import styled from 'styled-components'

import ClueWord from './ClueWord'

const StyledTable = styled.table`
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 5px 6px;
`

const ClueList = ({clues, guessIndex, Colour}) => {
  return(
    <StyledTable>
      <tbody>
        {clues.map(clue => <ClueWord clue={clue} guessIndex={guessIndex} Colour={Colour} key={clue.number}/>)}
      </tbody>
    </StyledTable>
  )
}

export default ClueList
