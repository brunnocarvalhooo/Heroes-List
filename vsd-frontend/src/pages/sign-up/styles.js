import styles from 'styled-components'

import background from '../../assets/bg-black.png'

export const Container = styles.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styles.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60vw;
  height: 60vh;

  form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      align-items: center;
  
      img {
        width: 150px;
        height: 50px;
        margin-bottom: 1em;
        margin-left: 10px;
      }
  
      .heroesList {
        width: 80px;
        height: 80px;
        max-width: 300px;
      }

      h1 {
        color: #fff;
        font-size: 2.5em;
        margin-bottom: 1em;
        margin-top: 0.5em;
        width: 30vw;
      }
    }

    hr {
      margin: 0.5em 0;
      opacity: 0.7;
      width: 94%;
      margin-left: 3%;
      margin-right: 3%;
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

export const Background = styles.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
  z-index: -1;

  > div {
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0.4;
  }
`
