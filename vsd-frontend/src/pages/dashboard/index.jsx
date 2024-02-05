import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Container } from './styles'
import { useAuth } from '../../shared/hooks/auth'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllLists } from '../../api/heroes-list-api'

export const Dashboard = () => {
  const { user } = useAuth()

  const theme = useTheme()

  const [lists, setLists] = useState()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllLists()
        setLists(result.data.data)
      } catch (error) {
        alert(error.message)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 20,
          }}
        >
          <h4>Hello, {user.name}</h4>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              sx={{
                color: '#fff',
                width: '80%',
                textAlign: 'center',
              }}
            >
              Welcome to Heroes List, your ultimate app for creating and
              managing lists of heroes! Create themed lists, such as &quot;Best
              Villains&quot;, &quot;Powerful Superheroines&quot;, or even
              &quot;Dream Team&quot;. With Heroes List, you can explore a wide
              variety of amazing characters, select your favorite heroes, and
              organize them according to your preferences.
            </Typography>
          </div>
        </div>

        <Grid
          container
          style={{ display: 'flex', flexDirection: smDown ? 'column' : '' }}
        >
          <Grid
            item
            xs={smDown ? 12 : 4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#fff' }} variant="h4">
                {user.name}
              </Typography>
              <Typography
                sx={{ color: '#ddd', marginBottom: 2, textAlign: 'center' }}
              >
                This is your profile in our system. Here are some important
                information:
              </Typography>
              <Typography sx={{ color: '#ddd', textAlign: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Name:</span> {user.name}
              </Typography>
              <Typography sx={{ color: '#ddd', textAlign: 'center' }}>
                <span style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Email:
                </span>{' '}
                {user.email}
              </Typography>
              <Typography
                sx={{ color: '#ddd', marginBottom: 2, textAlign: 'center' }}
              >
                <span style={{ fontWeight: 'bold' }}>Password:</span> is
                secret...🤫
              </Typography>
              <Typography sx={{ color: '#ddd', textAlign: 'center' }}>
                Remember to keep your information secure and up-to-date. If you
                you need to make changes, feel free to edit your profile at any
                time.
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={'/profile'} style={{ marginBottom: 30 }}>
                <Button size="small">go to profile</Button>
              </Link>
            </CardActions>
          </Grid>

          <Grid
            item
            xs={smDown ? 12 : 4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#fff' }} variant="h4">
                Heroes
              </Typography>
              <Typography
                sx={{ color: '#ddd', marginBottom: 2, textAlign: 'center' }}
              >
                In Heroes List, you have the opportunity to explore a gallery
                filled with incredible and powerful characters. From classic
                superheroes to exciting new additions, each hero has a unique
                story and extraordinary abilities.
              </Typography>
              <Typography
                sx={{ color: '#ddd', textAlign: 'center' }}
                variant="h6"
              >
                + 3000 Heroes!
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={'/heroes'} style={{ marginBottom: 30 }}>
                <Button size="small">Find Heroes</Button>
              </Link>
            </CardActions>
          </Grid>

          <Grid
            item
            xs={smDown ? 12 : 4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Typography sx={{ color: '#fff' }} variant="h4">
                Lists
              </Typography>
              <Typography
                sx={{ color: '#ddd', marginBottom: 2, textAlign: 'center' }}
              >
                In Heroes List, you&apos;re in control! Unleash your creativity
                and craft personalized lists of heroes that reflect your unique
                taste. Organize your favorite characters, add or remove heroes
                as you see fit.
              </Typography>

              <Typography
                sx={{ color: '#ddd', marginBottom: 2, textAlign: 'center' }}
              >
                {lists && lists.length > 0
                  ? `You have ${lists.length} ${
                      lists.length === 1 ? 'list!' : 'lists!'
                    }`
                  : `It looks like you don't have a list yet. Click on the button below.`}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={'/lists'} style={{ marginBottom: 30 }}>
                <Button size="small">
                  {lists && lists.length > 0 ? `See my Lists` : `Create List`}
                </Button>
              </Link>
            </CardActions>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
