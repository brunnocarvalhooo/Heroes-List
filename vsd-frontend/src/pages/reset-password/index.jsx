import { useCallback, useRef, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  AiOutlineArrowLeft,
  AiFillLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'

import { Form } from '@unform/web'

import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'

import { useToast } from '../../shared/hooks/Toast'
import { Input, Button } from '../../shared/components'
import { resetPassword } from '../../api/heroes-list-api'

import { Container, Content, Background } from './styles'

export const ResetPassword = () => {
  const formRef = useRef(null)

  const navigate = useNavigate()

  const token = useParams()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (formData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Password is a required field.')
            .min(6, 'The password must contain at least 6 characters.'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must be the same.',
          ),
        })

        await schema.validate(formData, { abortEarly: false })

        await resetPassword({ password: formData.password, token })

        addToast({
          type: 'success',
          title: 'Password reset successful.',
        })

        setLoading(false)

        navigate('/')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        setLoading(false)

        addToast({
          type: 'error',
          title: 'An error occurred',
          description: 'Please try again later.',
        })
      }
    },
    [addToast, navigate],
  )

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [])

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Password reset</h1>

          <div className="password">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              icon={AiFillLock}
              placeholder="Enter your new password"
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
            name="password_confirmation"
            type="password"
            icon={AiFillLock}
            placeholder="Confirm your password"
          />

          {!loading && <Button type="submit">Reset</Button>}
          {loading && (
            <Button type="submit" disabled>
              Aguarde...
            </Button>
          )}
        </Form>
        <Link to="/">
          Return to login <AiOutlineArrowLeft size={24} />
        </Link>
      </Content>

      <Background>
        <div></div>
      </Background>
    </Container>
  )
}
