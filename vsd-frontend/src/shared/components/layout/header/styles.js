import styled from 'styled-components'

export const Container = styled.div`
  grid-area: HE;

  width: 100%;
  height: 15vh;

  background: linear-gradient(to left, rgb(188, 28, 28), rgb(140, 28, 28));
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 1.5em;

  height: 100%;

  .logo {
    width: 4.5em;
    height: 4.5em;
    min-width: 70px;
    min-height: 60px;
  }
`

export const ImageContainer = styled.div``

export const Image = styled.img`
  width: 3em;
  height: 3em;
  min-width: 60px;
  min-height: 60px;
  max-width: 3vw;
  max-height: 3vh;

  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow};

  transition: 0.3s;

  &:hover {
    transform: scale(1.07);
  }
`
export const GreatingsContainer = styled.div`
  display: flex;
  align-items: center;

  margin: 0 1em;

  strong {
    font-size: 1.5em;
    color: ${({ theme }) => theme.contrast};
    font-weight: 600;
    margin-right: 4px;
  }
`

export const ActionsProfileContainer = styled.div`
  color: ${({ theme }) => theme.contrast};

  cursor: pointer;

  span {
    font-size: 1.5em;
    margin-left: 8px;
    color: ${({ theme }) => theme.contrast};
    font-weight: 500;
  }

  > a {
    &:active {
      text-decoration: none;
      color: inherit;
    }
  }
`
