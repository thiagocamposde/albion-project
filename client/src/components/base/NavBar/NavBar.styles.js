import { withStyles } from '@material-ui/styles'

import NavBar from './NavBar'

const styles = theme => {
  return {
    root: {
      backgroundColor: theme.colors.darkGray1
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      },
      fontSize: '1.4rem',
      fontWeight: '700',
      backgroundColor: theme.colors.darkGray2,
      borderRadius: '1rem',
      padding: '1rem'
    },
    container: {
      marginLeft: '2rem'
    },
    searchContainer: {
      width: '40rem',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '1rem'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    link: {
      textDecoration: 'none',
      color: theme.colors.lightGray1
    },
    optionLink: {
      textDecoration: 'none',
      color: theme.colors.darkGray3
    }
  }
}

export default withStyles(styles)(NavBar)
