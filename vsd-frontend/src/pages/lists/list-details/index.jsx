import { useRef, useCallback, useEffect, useState } from 'react'
import { Container } from '../styles'
import '../styles.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BaseLayout } from '../../../shared/layouts/BaseLayout'
import { FormToolbar, Input } from '../../../shared/components'
import { IoIosArrowForward } from 'react-icons/io'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'

import { getList, updateList } from '../../../api/heroes-list-api'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useToast } from '../../../shared/hooks/Toast'
import getValidationErrors from '../../../shared/utils/getValidationErrors'
import { FaArrowUp } from 'react-icons/fa6'

export const ListDetails = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const [list, setList] = useState([])
  const { addToast } = useToast()

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleRmove = useCallback(
    (hero) => {
      setList((prevList) => ({
        ...prevList,
        heroes: prevList.heroes.filter(
          (heroToRemove) => heroToRemove.heroId !== hero.heroId,
        ),
      }))
    },
    [setList],
  )

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Title is a required field.'),
          description: Yup.string(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const heroes = list.heroes

        const saveList = {
          title: data.title,
          description: data.description,
          heroes: JSON.stringify(heroes),
        }

        await updateList(saveList, id)

        navigate('/lists')
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
      }
    },
    [addToast, navigate, id, list],
  )

  useEffect(() => {
    const fetchData = async () => {
      const result = await getList(id)
      setList(result.data)
    }
    fetchData()
  }, [id])

  return (
    <BaseLayout
      toolbar={
        <FormToolbar
          showSave
          handleSave={() => formRef.current?.submitForm()}
          handleBack={() => navigate('/lists')}
        />
      }
    >
      <Container>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span className="span">
              <Link to={'/lists'} style={{ color: '#aaa' }}>
                Heroes List
              </Link>
              <IoIosArrowForward
                className="svg"
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            </span>
            <h3>List details</h3>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: '8%',
            }}
          >
            <div
              style={{
                width: '70%',
                margin: '0 auto',
              }}
            >
              <Form ref={formRef} onSubmit={handleSubmit} initialData={list}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Typography marginRight={2} variant="h6" color="#fff">
                    Title:
                  </Typography>
                  <Input name="title" />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography marginRight={2} variant="h6" color="#fff">
                    Description:
                  </Typography>
                  <Input name="description" />
                </div>
              </Form>
            </div>
            <div style={{ margin: '50px 20px 0 20px' }}>
              <Accordion
                style={{ background: '#111', color: '#fff', marginBottom: 20 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h5">
                    Heroes ({list.heroes ? list.heroes.length : 0})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container display="flex" justifyContent="center">
                    <Grid item xs={12}>
                      {list && list.heroes && list.heroes.length > 0 ? (
                        <>
                          {list.heroes.length > 7 && isVisible && (
                            <Fab
                              style={{
                                color: '#fff',
                                width: '50px',
                                height: '50px',
                                position: 'fixed',
                                right: 0,
                                bottom: 0,
                                margin: '0 45px 45px 0',
                                background: 'rgba(242, 27, 45)',
                                borderRadius: '50%',
                              }}
                              onClick={handleScrollToTop}
                              title="Voltar para o início"
                            >
                              <FaArrowUp size={30} />
                            </Fab>
                          )}

                          {list.heroes.map((hero) => (
                            <div key={hero.heroId} style={{ marginBottom: 15 }}>
                              <Card
                                sx={{
                                  width: '100%',
                                  maxHeight: '350px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  background: 'transparent',
                                  boxShadow: 'none',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                  }}
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
                                  <div style={{ width: '70%' }}>
                                    <div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <CardHeader title={hero.heroName} />
                                        <CardActions disableSpacing>
                                          <IconButton
                                            title="Remover"
                                            onClick={() => handleRmove(hero)}
                                          >
                                            <CloseIcon fontSize="small" />
                                          </IconButton>
                                        </CardActions>
                                      </div>

                                      <CardContent>
                                        <Typography
                                          paragraph
                                          style={{ color: '#fff' }}
                                        >
                                          {hero.heroDescription}
                                        </Typography>
                                      </CardContent>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>
                          No heroes available.
                          <Link
                            to={'/heroes'}
                            style={{
                              textDecoration: 'underline',
                              marginLeft: 10,
                            }}
                          >
                            add heroes
                          </Link>
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>
    </BaseLayout>
  )
}
