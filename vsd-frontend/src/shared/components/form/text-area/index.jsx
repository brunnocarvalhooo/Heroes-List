import { useField } from '@unform/core'
import { useRef, useEffect, useState, useCallback } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { useTheme } from 'styled-components'

import { Container, Error } from './styles'

export const TextArea = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null)

  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, registerField, error, defaultValue } = useField(name)

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleonBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <textarea
        type="text"
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        onBlur={handleonBlur}
        onFocus={handleOnFocus}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color={theme.error_background} size={20} />
        </Error>
      )}
    </Container>
  )
}
