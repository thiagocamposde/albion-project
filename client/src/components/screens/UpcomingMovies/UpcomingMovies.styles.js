import { withStyles } from '@material-ui/styles'
import UpcomingMovies from './UpcomingMovies'

const styles = theme => {
  return {
    root: {
      padding: '1.6rem',
      display: 'flex',
      justifyContent: 'center'

    },
    listContainer: {
      width: '70%',
      marginTop: '5rem',
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    },
    movieListContainer: {
      padding: '1rem'
    },
    link: {
      textDecoration: 'none'
    },
    pagination: {
      listStyleType: 'none',
      color: theme.colors.lightGray1,
      fontSize: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0',
      margin: '0'
    },
    subContainerPagination: {
      backgroundColor: theme.colors.lightGray2,
      borderColor: theme.colors.darkGray2,
      float: 'left',
      border: '0.1rem solid',
      display: 'flex',
      cursor: 'pointer'
    },
    pageLinkClassName: {
      padding: '1rem 2rem'
    },
    previousClassName: {
      float: 'left',
      marginRight: '1rem',
      cursor: 'pointer'
    },
    nextClassName: {
      float: 'left',
      marginLeft: '1rem',
      cursor: 'pointer'
    }
  }
}

export default withStyles(styles)(UpcomingMovies)
