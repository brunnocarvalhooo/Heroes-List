import { GiDoor, GiExitDoor } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { Container, ExitButton } from './styles'

import { useAuth } from '../../../hooks/auth'

export const Navbar = () => {
  const { signOut } = useAuth()

  const [isHovered, setIsHovered] = useState(false)

  return (
    <Container>
      <Link to="/home">
        <h1>Home</h1>
      </Link>
      <Link to="/heroes">
        <h1>Heroes</h1>
      </Link>
      <Link to="/lists">
        <h1>Lists</h1>
      </Link>
      <Link to="/profile">
        <h1>Profile</h1>
      </Link>
      <Link onClick={signOut} title="Sair" className="exit" to="/">
        <ExitButton
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <GiExitDoor /> : <GiDoor />}
        </ExitButton>
      </Link>
    </Container>
  )
}
