import React from "react";
import MainsScreen from "./components/screens/MainScreen";
import theme from "./Theme";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../src/components/base/NavBar";

function App() {
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
