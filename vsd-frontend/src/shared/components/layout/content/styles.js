import styled from 'styled-components'

import background from '../../../../assets/comic-bg.png'

export const Container = styled.div`
  grid-area: CT;

  width: 100%;
  height: 80vh;

  background: url(${background}) center no-repeat;
  background-size: cover;
`
