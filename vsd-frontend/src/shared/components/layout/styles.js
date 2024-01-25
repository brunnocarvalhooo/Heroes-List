import styled from 'styled-components'

export const GridContainer = styled.div`
  display: grid;

  grid-template-columns: 100%;
  grid-template-rows: 15%;

  height: 100vh;

  grid-template-areas:
    'HE'
    'NAV'
    'CT';
`
