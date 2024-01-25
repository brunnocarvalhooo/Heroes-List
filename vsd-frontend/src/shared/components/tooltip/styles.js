import styles from 'styled-components'

export const Container = styles.div`
  position: relative;
  cursor: pointer;

  span {
    position: absolute;
    bottom: calc(100% + 12px);
    left: -400%;
    tranform: translateX(-50%);
    border: 2px solid #eee;

    background: ${({ theme }) => theme.secondary_light};
    color: #fff;

    width: 180px;
    padding: 8px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    &::before {
      content: '';
      border-style: solid;
      border-color: #eee transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
