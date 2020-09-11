import React from "react";
import CraftingTool from "../CraftingTool";
import { Switch, Route } from "react-router-dom";

const MainsScreen = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" render={(props) => <CraftingTool {...props} />} />
      </Switch>
    </div>
  );
};

export default MainsScreen;
