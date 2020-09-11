import { withStyles } from "@material-ui/styles";
import CraftingTool from "./CraftingTool";

const styles = (theme) => {
  return {
    root: {
      marginTop: "64px",
      padding: "20px",
    },
    loss: {
      color: "red",
    },
    profit: {
      color: "green",
    },
    filtersContainer: {
      display: "flex",
      marginTop: "10px",
      marginBottom: "10px",
      "& > div": {
        flexGrow: 1,
        marginRight: "10px",
      },
      "& > div:last-child": {
        marginRight: "0px",
      },
    },
    searchbar: {
      display: "flex",
      "& > div": {
        flexGrow: 1,
        marginRight: "10px",
      },
      "& > button": {
        flexGrow: 0,
      },
    },
  };
};

export default withStyles(styles)(CraftingTool);
