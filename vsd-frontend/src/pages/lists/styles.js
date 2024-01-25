import styled from 'styled-components'

import { Box } from '@mui/material'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    color: #fff;
    margin-top: 4vh;
  }

  span {
    color: #aaa;
    margin-left: 10px;

    svg {
      margin-top: 4.1vh;
    }
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

export const Path = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #aaa;

    svg {
      margin: 0 10px;
    }
  }
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

export const ModalContainer = styled.div``
