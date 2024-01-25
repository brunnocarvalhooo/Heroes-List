import React from 'react'
import { Stack, Alert } from '@mui/material'

export const useAlert = (severity, message) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </Stack>
  )
}
