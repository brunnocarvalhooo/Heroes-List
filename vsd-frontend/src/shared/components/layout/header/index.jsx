/* eslint-disable no-template-curly-in-string */
import { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Environment } from '../../../environments'
import { useAuth } from '../../../hooks/auth'

import HeroesListLogo from '../../../../assets/logo.png'

import {
  Container,
  Content,
  ImageContainer,
  Image,
  GreatingsContainer,
  ActionsProfileContainer,
} from './styles'
import { useMediaQuery, useTheme as themeUse } from '@mui/material'

export const Header = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const themer = themeUse()

  const getPicture = () => {
    const appData = JSON.parse(localStorage.getItem(Environment.APP_NAME))
    return appData ? appData.user.avatar : ''
  }

  const [picture, setPicture] = useState(getPicture)

  const smDown = useMediaQuery(themer.breakpoints.down('sm'))

  useEffect(() => {
    setPicture(getPicture())
  }, [user.avatar])

  return (
    <Container>
      <Content>
        <div
          style={{
            width: '100vw',
            background:
              'linear-gradient(to left, rgb(188, 28, 28), rgb(140, 28, 28));',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ImageContainer>
            <Link title={user.name} to="/profile">
              <Image
                src={
                  picture
                    ? `${Environment.URL_API_HEROES_LIST + '/files/' + picture}`
                    : `https://ui-avatars.com/api/?font-size=0.33&background=${theme.info_title.substring(
                        1,
                        theme.background.length,
                      )}&color=${theme.contrast.substring(
                        1,
                        theme.contrast.length,
                      )}&name=${user.name}`
                }
                alt={user.name}
              />
            </Link>
          </ImageContainer>

          <div style={{ width: '100%' }}>
            <GreatingsContainer>
              {smDown ? '' : <strong>Hello, </strong>}

              <ActionsProfileContainer>
                <Link to="/profile">
                  <span>{user.name}</span>
                </Link>
              </ActionsProfileContainer>
            </GreatingsContainer>
          </div>

          <Link title="Home" to="/home">
            <img className="logo" src={HeroesListLogo} alt="" />
          </Link>
        </div>
      </Content>
    </Container>
  )
}
