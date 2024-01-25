import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineMail } from 'react-icons/md'
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'
import { Button, Input } from '../../shared/components/'
import { useAuth } from '../../shared/hooks/auth'
import { useToast } from '../../shared/hooks/Toast'

import HeroesListLogo from '../../assets/logo.png'
import logo from '../../assets/logo-marvel.png'

import { Container, Content, Background } from './styles'

export const SignIn = () => {
  const formRef = useRef(null)

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (formData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is a required field.')
            .email('Enter a valid email address.'),
          password: Yup.string()
            .required('Password is a required field.')
            .min(6, 'The password must contain at least 6 characters.'),
        })

        await schema.validate(formData, { abortEarly: false })

        const { email, password } = formData

        await signIn(email, password)

        addToast({
          type: 'success',
          title: 'successfully logged',
        })

        setLoading(false)

        navigate('/home')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err)

          formRef.current.setErrors(error)
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description: 'There was an error logging in, check your credentials.',
        })

        setLoading(false)
      }
    },
    [signIn, addToast, navigate],
  )

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [])

  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="Marvel" />
          <img className="heroesList" src={HeroesListLogo} alt="Heroes List" />
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Login</h1>

          <Input
            name="email"
            type="email"
            icon={MdOutlineMail}
            placeholder="Enter your email"
          />

          <div className="password">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              icon={AiFillLock}
              placeholder="Enter your password"
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

          {!loading && <Button type="submit">Enter</Button>}
          {loading && (
            <Button type="submit" disabled>
              Wait...
            </Button>
          )}

          <Link to="/forgot-password">Forgot password</Link>
        </Form>

        <Link to="/sign-up">Sign up</Link>
      </Content>

      <Background>
        <div></div>
      </Background>
    </Container>
  )
}
