import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { FiCamera } from 'react-icons/fi'

import * as Yup from 'yup'

import { BaseLayout } from '../../shared/layouts/BaseLayout'
import { Input, FormToolbar } from '../../shared/components'

import getValidationErrors from '../../shared/utils/getValidationErrors'
import { updateUserData, uploadImage } from '../../api/heroes-list-api'
import { Environment } from '../../shared/environments'
import { useToast } from '../../shared/hooks/Toast'
import { useAuth } from '../../shared/hooks/auth'

import {
  Container,
  Header,
  Image,
  ImageContainer,
  ButtonImage,
  FormContainer,
} from './styles'

export const Profile = () => {
  const formRef = useRef(null)

  const { user, updateUser } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const theme = useTheme()

  const [showPassword, setShowPassword] = useState(false)

  const [picture, setPicture] = useState(() => {
    const appData = JSON.parse(localStorage.getItem(Environment.APP_NAME))

    if (appData) {
      return appData.user.avatar
    }

    return ''
  })

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is a required field.'),
          email: Yup.string()
            .required('Email is a required field.')
            .email('Enter a valid email address'),
          password: Yup.string(),
          confirm_password: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must be the same',
          ),
        })

        await schema.validate(data, { abortEarly: false })

        Object.assign(data, {
          id: user.id,
        })

        const { data: userUpdated } = await updateUserData(data)

        updateUser(userUpdated)

        addToast({
          type: 'success',
          title: 'Data changed successfully.',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'Check the fields',
        })
      }
    },
    [addToast, user.id, updateUser],
  )

  const handleGoBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const handleUploadImage = useCallback(
    async (event) => {
      const formData = new FormData()
      formData.append('avatar', event.target.files[0])

      const { data } = await uploadImage(formData)

      updateUser(data)
      setPicture(data.avatar)
    },
    [updateUser],
  )

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [])

  return (
    <BaseLayout
      toolbar={
        <FormToolbar
          handleSave={() => formRef.current?.submitForm()}
          handleBack={handleGoBack}
          showSave
        />
      }
    >
      <Container>
        <h3>Profile</h3>
        <Header>
          <ImageContainer>
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

            <ButtonImage htmlFor="picture">
              <FiCamera />
              <input type="file" id="picture" onChange={handleUploadImage} />
            </ButtonImage>
          </ImageContainer>

          <span>{user.name}</span>
        </Header>

        <FormContainer ref={formRef} onSubmit={handleSubmit} initialData={user}>
          <Input name="name" placeholder="Name" />
          <Input name="email" placeholder="E-mail" />

          <div>
            <hr />
            <span>Change password</span>
            <hr />
          </div>

          <div className="password">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
            />
            {showPassword ? (
              <AiOutlineEye
                className="password-eye"
                onClick={handleShowPassword}
                size={24}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="password-eye"
                onClick={handleShowPassword}
                size={24}
              />
            )}
          </div>

          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm password"
          />
        </FormContainer>
      </Container>
    </BaseLayout>
  )
}
