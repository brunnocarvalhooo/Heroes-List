import styled from 'styled-components'

import { Form } from '@unform/web'

export const Container = styled.div`
  width: 40vw;
  margin: 0 auto;

  h3 {
    display: flex;
    justify-content: center;
    color: #fff;
    margin-top: 4vh;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 1em;
    font-weight: 600;
    color: #fff;
    margin-top: 16px;
  }
`

export const Image = styled.img`
  width: 10em;
  height: 10em;
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.box_shadow};
  margin-top: 3em;
`

export const ImageContainer = styled.div`
  position: relative;
`

export const ButtonImage = styled.label`
  position: absolute;

  right: 0.5em;
  bottom: 1em;

  transition: all 0.3s;

  width: 2em;
  height: 2em;

  background-color: ${({ theme }) => theme.background};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  svg {
    font-size: 1em;
    color: ${({ theme }) => theme.text};
  }

  input {
    display: none;
  }
`

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 32px 0;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    text-align: center;

    > span {
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      margin: 0 1em 0.7em 1em;
      color: #bbb;
    }

    hr {
      height: 2px;

      width: 90%;
      opacity: 0.6;
      margin-bottom: 8px;
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
`
