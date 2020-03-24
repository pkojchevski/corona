import React from "react";
import { CoronaGlobalProvider } from "./context";
import Content from "./components/Layout/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <CoronaGlobalProvider>
      <Content />
    </CoronaGlobalProvider>
  );
}

export default App;
