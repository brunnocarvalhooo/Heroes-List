import { useState, useCallback, useEffect, useRef } from 'react'
import { Box, Button, CircularProgress, Fab, Grid, Modal } from '@mui/material'
import * as Yup from 'yup'

import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { FaArrowUp } from 'react-icons/fa6'
import { MdSearch } from 'react-icons/md'

import { Container } from './styles'

import './styles.css'

import {
  createList,
  getHeroes,
  getList,
  getListsByUser,
  updateList,
} from '../../api/heroes-list-api'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import {
  FormToolbar,
  Input,
  TextArea,
  Button as SharedButton,
} from '../../shared/components'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '@unform/web'
import { ModalContainer, Path } from '../lists/styles'
import { IoIosArrowForward } from 'react-icons/io'
import { FormContainer } from '../profile/styles'
import { useToast } from '../../shared/hooks/Toast'
import getValidationErrors from '../../shared/utils/getValidationErrors'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  minWidth: '200px',
  maxWidth: '700px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 5,
  p: 4,
}

const columns = [
  { field: 'list-name', headerName: 'List name', width: 250 },
  { field: 'heroes-count', headerName: 'Heroes count', width: 250 },
]

export const Heroes = () => {
  const [row, setRow] = useState([])
  const [nameStartsWith, setNameStartsWith] = useState('')
  const [hero, setHero] = useState({})
  const [lists, setLists] = useState([])

  const { addToast } = useToast()
  const serachRef = useRef()

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [openSelect, setOpenSelect] = useState(false)

  const formRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrollTop = window.scrollY

    const scrollTrigger = 2000

    setIsVisible(scrollTop > scrollTrigger)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleGoBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingContent(true)
        const result = await getHeroes()

        if (result instanceof Error) {
          setIsLoadingContent(false)
          alert(result.message)
        } else {
          setIsLoadingContent(false)
          setRow(result.data)
        }
      } catch (error) {
        alert(error.message)
      }
    }

    fetchData()
  }, [])

  const handleSave = async () => {
    for (const rowId of selectedRows) {
      const result = await getList(rowId)

      const title = result.data.title
      const description = result.data.description

      const existingHeroes = Array.isArray(result.data.heroes)
        ? result.data.heroes
        : []

      const list = {
        title,
        description,
        heroes: JSON.stringify([...existingHeroes, hero]),
      }

      await updateList(list, result.data.id)

      setOpenSelect(false)
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleOpen = () => {
    setOpen(true)

    setOpenSelect(false)
  }

  const handleOpenSelect = async (hero) => {
    setOpenSelect(true)
    setHero(hero)

    const result = await getListsByUser()

    setLists(result.data)
  }

  const rows = lists.map((list) => ({
    id: list.id,
    'list-name': list.title,
    'heroes-count': list.heroes ? list.heroes.length : 0,
  }))

  const handleClose = () => setOpen(false)

  const handleSearch = useCallback(async () => {
    setIsLoading(true)
    const result = await getHeroes(nameStartsWith)

    setRow(result.data)
    setIsLoading(false)
  }, [nameStartsWith, setRow, setIsLoading])

  const handleSubmit = useCallback(
    async (data) => {
      setIsLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Title is a required field.'),
          description: Yup.string(),
        })

        await schema.validate(data, { abortEarly: false })

        createList(data)

        addToast({
          type: 'success',
          title: 'List created successfully.',
        })

        setIsLoading(false)
        setOpen(false)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Authentication error.',
          description: 'Check the fields',
        })

        setIsLoading(false)
      }
    },
    [addToast],
  )

  return (
    <BaseLayout>
      <FormToolbar handleBack={handleGoBack} showNew handleNew={handleOpen} />
      <ModalContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Path display="flex" justifyContent="center" alignItems="center">
              <span className="span">
                <Link
                  className="a"
                  onClick={handleClose}
                  style={{ color: '#aaa' }}
                >
                  Heroes
                </Link>
                <IoIosArrowForward className="svg" />
              </span>
              <h3>Create List</h3>
            </Path>

            <FormContainer ref={formRef} onSubmit={handleSubmit}>
              <Input name="title" placeholder="Title" />
              <TextArea name="description" placeholder="Description" />
            </FormContainer>
            {!isLoading && (
              <SharedButton
                type="submit"
                onClick={() => formRef.current?.submitForm()}
              >
                Create
              </SharedButton>
            )}
            {isLoading && (
              <Button type="submit" disabled>
                Wait...
              </Button>
            )}
          </Box>
        </Modal>
      </ModalContainer>
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
                    onClick={handleClose}
                    style={{ color: '#aaa' }}
                  >
                    Heroes
                  </Link>
                  <IoIosArrowForward className="svg" />
                </span>
                <h3>{hero.heroName}</h3>
              </Path>
              <Box
                display="flex"
                justifyContent="center"
                marginTop={2}
                marginBottom={4}
              >
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
                  <Link onClick={handleOpen}> clicking here</Link>
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
        <Fab
          style={{
            display: isVisible ? 'block' : 'none',
            color: '#fff',
            width: '60px',
            height: '60px',
            position: 'fixed',
            left: 0,
            bottom: 0,
            paddingTop: 5,
            margin: '0 0 30px 30px',
            background: 'rgba(242, 27, 45)',
            borderRadius: '50%',
          }}
          onClick={handleScrollToTop}
          title="Voltar para o início"
        >
          <FaArrowUp size={30} />
        </Fab>

        <h3>Heroes</h3>

        <Form ref={serachRef} onSubmit={handleSearch}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '50vw',
            }}
          >
            <Box width="90%" marginTop={5} marginBottom={5}>
              <Input
                name="search"
                placeholder="Pesquisar..."
                onChange={(e) => setNameStartsWith(e.target.value)}
              />
            </Box>

            <div>
              {isLoading ? (
                <CircularProgress style={{ marginLeft: 30 }} />
              ) : (
                <Button
                  onSubmit={handleSearch}
                  type="submit"
                  variant="text"
                  style={{
                    color: 'red',
                    width: '30px',
                    height: '40px',
                    borderRadius: '50%',
                    marginLeft: 5,
                  }}
                  title="Pesquisar"
                >
                  <MdSearch size={30} />
                </Button>
              )}
            </div>
          </div>
        </Form>

        <Grid container display="flex" justifyContent="center" marginTop={2}>
          <Grid item xs={11.7}>
            {isLoadingContent ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 150,
                }}
              >
                <CircularProgress size={200} />
              </div>
            ) : row.length > 0 ? (
              row.map((hero) => (
                <Box
                  key={hero.heroId}
                  display="flex"
                  flexDirection="column"
                  marginBottom={3}
                >
                  <Card
                    sx={{
                      width: '100%',
                      maxHeight: '350px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <CardMedia
                        component="img"
                        image={`${hero.heroThumbnail.path}.${hero.heroThumbnail.extension}`}
                        alt={hero.heroName}
                        sx={{
                          width: '30vw',
                          // maxHeight: '35vh',
                          objectFit: 'cover',
                        }}
                      />
                      <Box sx={{ width: '70%' }}>
                        <Box>
                          <CardHeader title={hero.heroName} />
                          <CardActions disableSpacing>
                            <Link to={`/heroes/details/${hero.heroId}`}>
                              <IconButton
                                title={`Ver mais informações sobre ${hero.heroName}`}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              title="Adicionar a uma lista"
                              onClick={() => handleOpenSelect(hero)}
                            >
                              <FavoriteIcon />
                            </IconButton>
                          </CardActions>
                          <CardContent>
                            <Typography paragraph>
                              {hero.heroDescription}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              ))
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '5em',
                }}
              >
                <Typography
                  style={{ color: '#fff', fontSize: '50px', marginBottom: 20 }}
                >
                  No heroes found
                </Typography>
                <Typography style={{ color: '#fff', fontSize: '16px' }}>
                  type the name of a valid hero in the search bar
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </BaseLayout>
  )
}
