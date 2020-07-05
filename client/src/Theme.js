import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  colors: {
    lightGray1: '#D9D9D9',
    lightGray2: '#737373',
    darkGray1: '#404040',
    darkGray2: '#262626',
    darkGray3: '#0D0D0D'
  },
  palette: {
    text: {
      primary: '#D9D9D9'
    }
  },
  typography: {
    body1: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 400,
      fontSize: '1.6rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em'
    },
    body2: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 400,
      fontSize: '1.2rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em'
    }
  }
})

export default theme
