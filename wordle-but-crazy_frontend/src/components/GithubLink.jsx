import styled from "styled-components"

const StyledDiv = styled.div`
  position: fixed;
  left: 50px;
  bottom: 50px;
`

const GithubLink = () => {
  return (
    <StyledDiv>
      <a href='https://github.com/patricia-9000/wordle-but-crazy'>
        <img
          src='/../../assets/github-mark.svg'
          width='25%'
          alt='GitHub logo'
          title='GitHub repository'
        />
      </a>
    </StyledDiv>
  )
}

export default GithubLink
