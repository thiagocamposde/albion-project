import { withStyles } from '@material-ui/styles'
import MovieDetails from './MovieDetails'

const styles = theme => {
  return {
    root: {
      padding: '5rem 0',
      overflow: 'hidden'
    },
    movieContainer: {
      backgroundColor: theme.colors.darkGray1,
      marginTop: '5rem',
      [theme.breakpoints.down('md')]: {
        padding: '1rem'
      }
    },
    title: {
      marginBottom: '2rem'
    }
  }
}

export default withStyles(styles)(MovieDetails)
