import { withStyles } from '@material-ui/styles'
import Movie from './Movie'

const styles = theme => {
  return {
    root: {
    },
    title: {
      color: theme.colors.lightGray1,
      fontSize: '2rem'
    },
    releaseDate: {
      color: theme.colors.lightGray1
    },
    poster: {
      maxWidth: '100%'
    }
  }
}

export default withStyles(styles)(Movie)
