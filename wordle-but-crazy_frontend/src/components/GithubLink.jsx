import styled from "styled-components"

import githubLogo from '../../assets/github-mark.svg'

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
          src={githubLogo}
          width='25%'
          alt='GitHub logo'
          title='GitHub repository'
        />
      </a>
    </StyledDiv>
  )
}

export default GithubLink
