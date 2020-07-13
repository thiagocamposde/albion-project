import React, { useState, useEffect } from "react";
import MainsScreen from "./components/screens/MainScreen";
import theme from "./Theme";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../src/components/base/NavBar";

function App() {
  const [tmdbConfig, setTmdbConfig] = useState(null);
  const [tmdbConfigIsloading, setTmdbConfigIsLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <MainsScreen />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
