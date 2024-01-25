import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useRef, useState } from 'react'
import { MdOutlineMail } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'
import { signUp } from '../../api/heroes-list-api'
import { Button, Input } from '../../shared/components/'

import { Container, Content, Background } from './styles'

import HeroesListLogo from '../../assets/logo.png'
import logo from '../../assets/logo-marvel.png'
import { useToast } from '../../shared/hooks/Toast'

export const SignUp = () => {
  const formRef = useRef(null)

  const navigate = useNavigate()

  const { addToast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (formData) => {
      setLoading(true)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is a required field.'),
          email: Yup.string()
            .required('Email is a required field.')
            .email('Enter a valid email address.'),
          password: Yup.string()
            .required('Password is a required field.')
            .min(6, 'The password must contain at least 6 characters.'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must be the same.',
          ),
        })

        await schema.validate(formData, { abortEarly: false })

        const { name, email, password } = formData

        await signUp({ name, email, password })

        addToast({
          type: 'success',
          title: 'User successfully created.',
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
          title: 'Error in user creation',
          description: 'Check your credentials.',
        })
      }
    },
    [navigate, addToast],
  )

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [])

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <h1>Sign up</h1>
            <img src={logo} alt="Marvel" />
            <img
              className="heroesList"
              src={HeroesListLogo}
              alt="Heroes List"
            />
          </div>

          <Input
            name="name"
            type="text"
            icon={FaUserAlt}
            placeholder="Enter your name"
          />

          <Input
            name="email"
            type="email"
            icon={MdOutlineMail}
            placeholder="Enter your email"
          />

          <hr />

          <div className="password">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              icon={AiFillLock}
              placeholder="Create your password"
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

          {!loading && <Button type="submit">Create</Button>}
          {loading && (
            <Button type="submit" disabled>
              Wait...
            </Button>
          )}
        </Form>

        <Link to="/">Login</Link>
      </Content>

      <Background>
        <div></div>
      </Background>
    </Container>
  )
}
