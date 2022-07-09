import { createTheme, ThemeOptions, TypeBackground } from '@mui/material'
import React from 'react'

declare module '@mui/material/styles' {
  interface TypeBackground {
    active: string
  }
}

export const light: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#99CC00',
    },
    secondary: {
      main: '#888',
    },
    background: {
      default: '#e0e0e0',
      paper: '#ffffff',
      active: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 2,
  },
})

export const dark: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#99CC00',
    },
    secondary: {
      main: '#9e9e9e',
    },
    background: {
      default: '#121212',
      paper: '#222222',
      active: '#333333',
    },
  },
  shape: {
    borderRadius: 2,
  },
})
