import { Container } from './styles'

export const Content = ({ children }) => {
  return (
    <Container>
      {children}
      <div></div>
    </Container>
  )
}
