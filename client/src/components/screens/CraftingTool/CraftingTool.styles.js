import { withStyles } from "@material-ui/styles";
import CraftingTool from "./CraftingTool";

const styles = (theme) => {
  return {
    root: {
      padding: "1.6rem",
      marginTop: "64px",
    },
  };
};

export default withStyles(styles)(CraftingTool);
