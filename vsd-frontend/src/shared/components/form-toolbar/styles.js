import styled from 'styled-components'

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;

  width: 98%;

  padding: 1em;

  position: absolute;
`

export const ActionButtonContainer = styled.div`
  display: flex;

  > button {
    width: 3em;
    height: 3em;
    padding: 10px;
    border-radius: 50%;

    background: ${({ theme }) => theme.error_title};
    color: ${({ theme }) => theme.text};

    &:hover {
      border-radius: 50%;
      transform: scale(1.05);
    }
  }
`

export const EndButtonContainer = styled.div`
  display: flex;

  > button {
    width: 4em;
    height: 4em;
    border-radius: 50%;

    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`
