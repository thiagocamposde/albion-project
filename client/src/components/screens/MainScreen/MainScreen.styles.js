import { withStyles } from "@material-ui/styles";
import MainScreen from "./MainScreen";

const styles = (theme) => {
  return {
    root: {
      backgroundColor: "white",
      minHeight: "calc(100vh - 64px)",
      marginTop: " 64px",
    },
  };
};

export default withStyles(styles)(MainScreen);
