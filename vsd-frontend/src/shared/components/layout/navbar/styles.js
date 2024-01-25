import styled from 'styled-components'

export const Container = styled.div`
  grid-area: NAV;

  width: 100%;
  height: 5vh;

  background: linear-gradient(to left, rgb(188, 28, 28), rgb(140, 28, 28));

  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    color: black;

    height: 100%;
    width: 50%;
    padding: 0.5em;
    font-size: 0.7em;
  }

  .exit {
    height: 100%;
    width: 10%;

    svg {
      font-size: 3em;
      min-width: 8vw;
    }

    &:hover {
      color: ${({ theme }) => theme.background};
      background: rgb(188, 28, 28);
    }
  }

  transition: 1s;

  a:hover {
    background: black;
    color: #fff;
  }
`

export const ExitButton = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    font-size: 3em;
    min-width: 8vw;
    color: ${({ theme }) => theme.text};

    &:hover {
      color: ${({ theme }) => theme.background};
    }
  }
`
