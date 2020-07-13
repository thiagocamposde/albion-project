import React from "react";
import CraftingTool from "../CraftingTool";
import { Switch, Route } from "react-router-dom";

const MainsScreen = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" render={(props) => <CraftingTool {...props} />} />
        {/* <Route
          path="/movie/details/:id?"
          render={(props) => (
            <MovieDetails {...props} />
          )}
        /> */}
      </Switch>
    </div>
  );
};

export default MainsScreen;
