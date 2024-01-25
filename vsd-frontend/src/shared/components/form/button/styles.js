import styles from 'styled-components'

export const ButtonContainer = styles.button`
  background: ${({ theme }) => theme.primary};

  height: 40px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 16px;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
    border-radius: 8px;
    color: #fff;
  }
`
