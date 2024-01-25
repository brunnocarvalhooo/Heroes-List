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

  width: 50vw;
  height: 50vh;

  > div {
    display: flex;
    align-items: center;

    img {
      width: 40vw;
      max-width: 500px;
      min-width: 100px;
      height: 15vh;
      min-height: 100px;
      margin-bottom: 40px;
    }

    .heroesList {
      width: 15vw;
      height: 20vh;
      min-width: 150px;
      min-height: 130px;
      max-width: 250px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    h1 {
      color: #fff;
      font-size: 2.5em;
      margin-bottom: 1em;
      width: 30vw;
    }

    .password {
      display: flex;
      align-items: center;

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
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`
