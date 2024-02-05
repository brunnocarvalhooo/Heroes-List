import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container, ModalContainer, Path } from '../../lists/styles'
import { IoIosArrowForward } from 'react-icons/io'
import { BaseLayout } from '../../../shared/layouts/BaseLayout'
import { FormToolbar, Button as SharedButton } from '../../../shared/components'
import { useState, useEffect } from 'react'
import {
  getHero,
  getList,
  getListsByUser,
  updateList,
} from '../../../api/heroes-list-api'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Fab,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DataGrid } from '@mui/x-data-grid'
import { MdFavorite } from 'react-icons/md'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  minWidth: '200px',
  maxWidth: '700px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 5,
  p: 4,
}

export const Hero = () => {
  const [hero, setHero] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [openSelect, setOpenSelect] = useState(false)
  const [lists, setLists] = useState([])

  const heroId = useParams()
  const navigate = useNavigate()

  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const rows = lists.map((list) => ({
    id: list.id,
    'list-name': list.title,
    'heroes-count': list.heroes ? list.heroes.length : 0,
  }))

  const columns = [
    { field: 'list-name', headerName: 'List name', width: 250 },
    { field: 'heroes-count', headerName: 'Heroes count', width: 250 },
  ]

  const handleOpenSelect = async () => {
    setOpenSelect(true)

    const result = await getListsByUser()

    setLists(result.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHero(heroId.heroId)

        if (result instanceof Error) {
          alert(result.message)
        } else {
          setHero(result.data)
        }
      } catch (error) {
        alert(error.message)
      }
    }

    fetchData()
  }, [heroId])

  const handleSave = async () => {
    setIsLoading(true)
    for (const rowId of selectedRows) {
      const result = await getList(rowId)

      const title = result.data.title
      const description = result.data.description
      const heroData = {
        heroDescription: hero.description,
        heroId: hero.id,
        heroName: hero.name,
        heroThumbnail: {
          extension: hero.thumbnail.extension,
          path: hero.thumbnail.path,
        },
      }

      const existingHeroes = Array.isArray(result.data.heroes)
        ? result.data.heroes
        : []

      const list = {
        title,
        description,
        heroes: JSON.stringify([...existingHeroes, heroData]),
      }

      await updateList(list, result.data.id)

      setIsLoading(false)
      setOpenSelect(false)
    }
  }

  console.log(hero)

  return (
    <BaseLayout
      toolbar={<FormToolbar handleBack={() => navigate('/heroes')} />}
    >
      <ModalContainer>
        <Modal
          style={{ width: '100%' }}
          open={openSelect}
          onClose={() => setOpenSelect(false)}
        >
          <Box sx={style}>
            <div style={{ marginBottom: 10 }}>
              <Path display="flex" justifyContent="center" alignItems="center">
                <span className="span">
                  <Link
                    className="a"
                    onClick={() => setOpenSelect(false)}
                    style={{ color: '#aaa' }}
                  >
                    Heroes
                  </Link>
                  <IoIosArrowForward className="svg" />
                </span>
                <h3>{hero && hero.name}</h3>
              </Path>
              <Box display="flex" justifyContent="center" marginTop={2}>
                {rows.length !== 0 && (
                  <Typography>
                    Choose the list you want to add the selected hero
                  </Typography>
                )}
              </Box>
            </div>

            <div style={{ width: '100%', marginBottom: 20 }}>
              {rows.length === 0 ? (
                <Typography
                  variant="h6"
                  style={{ color: '#fff', textAlign: 'center', marginTop: 30 }}
                >
                  You don&apos;t have a list to add the hero, create one{''}
                  <Link to={'/lists'}> clicking here</Link>
                </Typography>
              ) : (
                <DataGrid
                  style={{ color: '#fff' }}
                  rows={rows}
                  columns={columns}
                  disableColumnMenu
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  rowWidth="100%"
                  checkboxSelection
                  onRowSelectionModelChange={(ids) => {
                    setSelectedRows(ids)
                  }}
                />
              )}
            </div>

            {rows.length > 0 && (
              <>
                {!isLoading && (
                  <SharedButton type="submit" onClick={handleSave}>
                    Save
                  </SharedButton>
                )}

                {isLoading && (
                  <Button type="submit" disabled>
                    Wait...
                  </Button>
                )}
              </>
            )}
          </Box>
        </Modal>
      </ModalContainer>
      <Container>
        {hero && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // marginRight: 35,
              }}
            >
              <span>
                <Link to={'/lists'} style={{ color: '#aaa' }}>
                  Heroes
                </Link>
                <IoIosArrowForward
                  style={{ marginLeft: 10, marginRight: 10 }}
                />
              </span>
              <h3>Hero details</h3>
            </div>

            <div
              style={{
                margin: '4em 2em 0 2em',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: smDown ? 'column' : '',
              }}
            >
              <Avatar
                style={{
                  borderRadius: 5,
                  width: '50%',
                  maxWidth: 300,
                  maxHeight: 300,
                  height: '50%',
                }}
                variant="square"
              >
                <img
                  src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                  alt={hero.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Avatar>

              <div
                style={{
                  color: '#fff',
                  marginLeft: 30,
                  marginTop: smDown ? 20 : '',
                }}
              >
                <Typography
                  display="flex"
                  alignItems="center"
                  marginBottom={2}
                  variant="h5"
                >
                  <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                    Name:
                  </span>{' '}
                  {hero.name}
                  <Fab
                    size="small"
                    title="Adicionar a uma lista"
                    onClick={handleOpenSelect}
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.05)',
                        color: '#ff2f00',
                        background: 'rgba(255, 47, 0, 0.2)',
                      },
                      color: '#fff',
                      background: 'transparent',
                      boxShadow: 'none',
                      transition: 'all 0.3s',
                      marginLeft: 1,
                    }}
                  >
                    <MdFavorite size={22} />
                  </Fab>
                </Typography>

                {hero.description !== '' && (
                  <Typography>
                    <span
                      style={{
                        fontWeight: 'bold',
                        marginRight: 10,
                        textAlign: 'center',
                      }}
                    >
                      Desciption:
                    </span>
                    {hero.description}
                  </Typography>
                )}
              </div>
            </div>

            <div style={{ padding: '20px 1em', width: '98vw' }}>
              <Accordion
                style={{
                  background: '#111',
                  color: '#fff',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Comics ({hero.comics.available})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {hero.comics.items.map((comic) => (
                    <div key={comic.resourceURI}>
                      <Typography style={{ marginTop: 5 }}>
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=Marvel+Comic+${comic.name}`}
                          rel="noreferrer"
                        >
                          {comic.name}
                        </a>
                      </Typography>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{
                  background: '#111',
                  color: '#fff',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Stories ({hero.stories.available})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {hero.stories.items.map((story) => (
                    <div key={story.resourceURI}>
                      <Typography style={{ marginTop: 5 }}>
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=Marvel+Story+${story.name}`}
                          rel="noreferrer"
                        >
                          {story.name}
                        </a>
                      </Typography>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{
                  background: '#111',
                  color: '#fff',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Events ({hero.events.available})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {hero.events.items.map((event) => (
                    <div key={event.resourceURI}>
                      <Typography style={{ marginTop: 5 }}>
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=Marvel+Event+${event.name}`}
                          rel="noreferrer"
                        >
                          {event.name}
                        </a>
                      </Typography>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
              <Accordion
                style={{
                  background: '#111',
                  color: '#fff',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Series ({hero.series.available})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {hero.series.items.map((serie) => (
                    <div key={serie.resourceURI}>
                      <Typography style={{ marginTop: 5 }}>
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=Marvel+Serie+${serie.name}`}
                          rel="noreferrer"
                        >
                          {serie.name}
                        </a>
                      </Typography>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        )}
      </Container>
    </BaseLayout>
  )
}
