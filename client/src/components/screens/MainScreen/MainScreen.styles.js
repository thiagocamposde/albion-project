import { withStyles } from '@material-ui/styles'
import MainScreen from './MainScreen'

const styles = theme => {
  return {
    root: {
      backgroundColor: theme.colors.darkGray2,
      minHeight: '100vh'
    }
  }
}

export default withStyles(styles)(MainScreen)
