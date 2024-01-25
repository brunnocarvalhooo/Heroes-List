import { Content } from './content'
import { Header } from './header'
import { Navbar } from './navbar'

import { GridContainer } from './styles'

export const Layout = ({ children }) => {
  return (
    <GridContainer>
      <Header />
      <Navbar />
      <Content>{children}</Content>
    </GridContainer>
  )
}
