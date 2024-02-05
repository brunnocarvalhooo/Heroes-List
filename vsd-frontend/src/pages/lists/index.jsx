import { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

import {
  createList,
  deleteList,
  getAllLists,
  getList,
  updateList,
} from '../../api/heroes-list-api'

import { Button, FormToolbar, Input, TextArea } from '../../shared/components'
import getValidationErrors from '../../shared/utils/getValidationErrors'
import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { useToast } from '../../shared/hooks/Toast'

import * as React from 'react'
import * as Yup from 'yup'

import TablePagination from '@mui/material/TablePagination'
import TableContainer from '@mui/material/TableContainer'
import DeleteIcon from '@mui/icons-material/Delete'
import { CircularProgress } from '@mui/material'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import EditIcon from '@mui/icons-material/Edit'
import TableRow from '@mui/material/TableRow'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Container, ModalContainer, Path } from './styles'
import './styles.css'
import { Form } from '@unform/web'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  minWidth: '200px',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 5,
  p: 4,
}

export const Lists = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [heroesCount, setHeroesCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [rowId, setRowId] = useState(0)

  const [editListData, setEditListData] = useState({
    title: '',
    description: '',
  })

  const handleClose = () => setOpen(false)
  const handleOpen = () => {
    setIsEditing(false)
    setOpen(true)
  }

  const openEditModal = (listData) => {
    setEditListData(listData)
    setIsEditing(true)
    setOpen(true)
    setRowId(listData.id)
  }

  const { addToast } = useToast()

  const navigate = useNavigate()

  const formRef = useRef(null)

  const handleEdit = useCallback(async (params) => {
    const list = await getList(params)

    setIsEditing(list.data)
  }, [])

  const handleDelete = useCallback(
    async (params) => {
      setIsLoading(true)
      try {
        await deleteList(params)

        const updatedRows = await getAllLists()

        setRows(updatedRows.data.data)

        addToast({
          type: 'success',
          title: 'List successfully deleted.',
        })

        navigate('/lists')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Error deleting list',
          description: 'Try again.',
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, navigate],
  )

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleGoBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

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

        await createList(data)

        const updatedRows = await getAllLists()

        setRows(updatedRows.data.data)

        const heroesCountArray = updatedRows.data.data.map(
          (data) => data.heroes?.length ?? 0,
        )
        setHeroesCount(heroesCountArray)

        addToast({
          type: 'success',
          title: 'List created successfully.',
        })

        navigate('/lists')
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
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, navigate],
  )

  const handleEditSubmit = useCallback(
    async (data) => {
      setIsLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Title is a required field.'),
          description: Yup.string(),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        updateList(data, rowId)

        navigate('/home')

        const updatedRows = await getAllLists()
        setRows(updatedRows.data.data)

        addToast({
          type: 'success',
          title: 'List updated successfully.',
        })

        navigate('/lists')
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
    [addToast, navigate, rowId],
  )

  const columns = [
    {
      id: 'delete',
      label: '',
      align: 'left',
      minWidth: '5vw',
    },
    {
      id: 'title',
      label: 'Name',
      minWidth: '30vw',
      align: 'left',
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: '50vw',
      align: 'left',
    },
    {
      id: 'heroesCount',
      label: 'Heroes count',
      minWidth: '10vw',
      align: 'right',
    },
    {
      id: 'view',
      label: '',
      minWidth: '5vw',
      align: 'right',
    },
  ]

  useEffect(() => {
    getAllLists().then((result) => {
      if (result instanceof Error) {
        alert(result.message)
      } else {
        setRows(result.data.data)

        const heroesCountArray = result.data.data.map(
          (data) => data.heroes?.length ?? 0,
        )
        setHeroesCount(heroesCountArray)
      }
    })
  }, [])

  return (
    <>
      <BaseLayout>
        <FormToolbar handleBack={handleGoBack} handleNew={handleOpen} showNew />
        <ModalContainer>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Path
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginBottom={3}
              >
                <span className="span">
                  <Link
                    className="a"
                    onClick={handleClose}
                    style={{ color: '#aaa' }}
                  >
                    Heroes Lists
                  </Link>
                  <IoIosArrowForward className="svg" />
                </span>
                <h3>{isEditing ? 'Edit List' : 'Create List'}</h3>
              </Path>

              <Form
                ref={formRef}
                onSubmit={isEditing ? handleEditSubmit : handleSubmit}
                style={{ marginBottom: 20, marginTop: 10 }}
              >
                <Input
                  defaultValue={isEditing ? editListData.title : ''}
                  name="title"
                  placeholder="Title"
                />
                <TextArea
                  defaultValue={isEditing ? editListData.description : ''}
                  name="description"
                  placeholder="Description"
                />
              </Form>
              {!isLoading && (
                <Button
                  type="submit"
                  onClick={() => formRef.current?.submitForm()}
                >
                  {isEditing ? 'Save' : 'Create'}
                </Button>
              )}
              {isLoading && (
                <Button type="submit" disabled>
                  Wait...
                </Button>
              )}
            </Box>
          </Modal>
        </ModalContainer>
        <Container>
          <h3>Heroes Lists</h3>
        </Container>
      </BaseLayout>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          marginTop: '32vh',
          background: 'transparent',

          borderCollapse: 'collapse',
          position: 'absolute',
          top: '0',
        }}
      >
        <TableContainer
          sx={{
            height: '62vh',
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    width: column.minWidth,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        const isLastColumn = column.id === 'heroesCount'
                        const displayValue = isLastColumn
                          ? heroesCount[rowIndex]
                          : value

                        if (isLastColumn && heroesCount[rowIndex] === 0) {
                          row.heroesCount = 0
                        }

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className={
                              column.id === 'title' ? 'title-column' : ''
                            }
                            style={{
                              width: column.minWidth,
                              maxWidth: column.maxWidth,
                              background: 'transparent',
                              color: 'white',
                              // whiteSpace: 'nowrap',
                            }}
                          >
                            {column.format && typeof displayValue === 'number'
                              ? column.format(displayValue)
                              : displayValue}
                            {column.id === 'title' && (
                              <Link
                                onClick={() => {
                                  handleEdit(row.id)
                                  openEditModal(row)
                                }}
                                className="edit-link"
                                variant="contained"
                                title="Editar"
                              >
                                <EditIcon className="edit" />
                              </Link>
                            )}
                            {column.id === 'delete' && (
                              <Link
                                onClick={() => handleDelete(row.id)}
                                variant="contained"
                                title="Deletar"
                              >
                                {!isLoading && (
                                  <DeleteIcon className="delete" />
                                )}
                                {isLoading && <CircularProgress size={18} />}
                              </Link>
                            )}
                            {column.id === 'view' && (
                              <Link
                                style={{ marginRight: 10 }}
                                to={`/lists/details/${row.id}`}
                                variant="contained"
                                title="Visualizar lista"
                              >
                                {!isLoading && (
                                  <VisibilityIcon className="delete" />
                                )}
                                {isLoading && <CircularProgress size={18} />}
                              </Link>
                            )}
                            {column.id === 'image' && (
                              <Link
                                onClick={() => handleDelete(row.id)}
                                variant="contained"
                              >
                                {/* <img
                                  src={
                                    listImage
                                      ? `${
                                          Environment.URL_API_HEROES_LIST +
                                          '/files/' +
                                          listImage
                                        }`
                                      : `https://ui-avatars.com/api/?font-size=0.33&background=${theme.info_title.substring(
                                          1,
                                          theme.background.length,
                                        )}&color=${theme.contrast.substring(
                                          1,
                                          theme.contrast.length,
                                        )}&name=${handleEdit.list.data.title}`
                                  }
                                  alt={handleEdit.list.data.title}
                                /> */}
                              </Link>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{
            background: 'transparent',
            color: 'white',

            display: 'flex',
            justifyContent: 'center',

            borderTop: '1px solid white',
          }}
        />
      </Paper>
    </>
  )
}
