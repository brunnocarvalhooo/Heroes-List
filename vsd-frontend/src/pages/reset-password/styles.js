import styled from 'styled-components'

import background from '../../assets/invert-comic-bg.png'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;

  width: 40vw;
  height: 40vh;

  form {
    display: flex;
    flex-direction: column;

    h1 {
      color: #fff;
      font-size: 2.5em;
      margin-bottom: 1em;
      margin-top: 0.5em;
      width: 30vw;
    }

    div {
      positon: relative;

      > img {
        width: 30px;
        height: 30px;
      }
    }

    .password {
      display: flex;
      align-items: center;
      margin-bottom: 0.7em;

      .password-eye {
        display: flex;
        color: ${({ theme }) => theme.secondary_light};
        cursor: pointer;
        margin-left: 8px;
      }
    }

    > button {
      margin-top: 24px;
    }

    button:disabled {
      background: transparent;
      color: #fff;
    }

    button:hover {
      color: #fff;
    }

    > a {
      color: ${({ theme }) => theme.primary_light};
      display: block;
      margin-top: 24px;
      text-align: right;

      &:hover {
        color: ${({ theme }) => theme.primary};
        transform: scale(1.02);
        opacity: 0.8;
      }
    }
  }

  > a {
    color: ${({ theme }) => theme.primary};
    display: block;
    margin-top: 24px;
    font-size: 22px;

    display: flex;
    align-items: center;

    svg {
      margin-left: 16px;
    }

    &:hover {
      transform: scale(1.02);
      opacity: 0.8;
    }
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

  > div {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.4;
  }
`
