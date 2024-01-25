import { useCallback, useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { MdOutlineMail } from 'react-icons/md'

import { Form } from '@unform/web'

import * as Yup from 'yup'

import getValidationErrors from '../../shared/utils/getValidationErrors'

import { useToast } from '../../shared/hooks/Toast'
import { Input, Button } from '../../shared/components'
import { forgotPassword } from '../../api/heroes-list-api'

import { Container, Content, Background } from './styles'

export const ForgotPassword = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()

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
        })

        await schema.validate(formData, { abortEarly: false })

        const { email } = formData

        await forgotPassword({ email })

        addToast({
          type: 'success',
          title: 'Email sent successfully. Check your inbox',
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
          title: 'Error sending email',
          description: 'Enter a valid email address.',
        })
      }
    },
    [addToast, navigate],
  )

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Forgot password</h1>

          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={MdOutlineMail}
          />

          {!loading && <Button type="submit">Send email</Button>}
          {loading && (
            <Button type="submit" disabled>
              Wait...
            </Button>
          )}
        </Form>
        <Link to="/">
          Back to login <AiOutlineArrowLeft size={24} />
        </Link>
      </Content>

      <Background>
        <div></div>
      </Background>
    </Container>
  )
}
