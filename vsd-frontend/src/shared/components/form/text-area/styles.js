import styles, { css } from 'styled-components'

import { Tooltip } from '../../tooltip'

export const Container = styles.div`
  background: ${({ theme }) => theme.primary_light};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 0.4em;
  width: 100%;
  min-height: 5em;
  color: ${({ theme }) => theme.text};


  & + div {
    margin-top: 0.7em;
  }

  &:hover {
    border-color: #bbb;
    transition: 0.2s;
    transform: scale(1.01);
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #ddd;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #eee;
      border-color: ${({ theme }) => theme.secondary};
      transition: 0.2s;
      transform: scale(1.01);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #eee;
    `}

  textarea {
    width: 100%;
    min-height: 5em;
    background: transparent;
    border: none;
    font-size: 14px;
    color: #fff;
    white-space: pre-wrap;
    resize: none;

    ${(props) =>
      props.isFilled &&
      css`
        color: #eee;
      `}

    &::placeholder {
      color: ${({ theme }) => theme.text};
    }
  }
`

export const Error = styles(Tooltip)`
  margin-left: 16px;
  height: 20px;

  svg {
    margin: 0;
  }
`
