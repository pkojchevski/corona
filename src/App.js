import React, { Fragment } from "react";
import { CoronaGlobalProvider } from "./context";
import Content from "./components/Layout/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Helmet } from "react-helmet";

function App() {
  return (
    <Fragment>
      <Helmet>
        <title>COVID-19</title>
        <meta name="description" content="App following COVID-19 cases" />
        <meta name="keywords" content="COVID-19,covid,corona, virus" />
      </Helmet>
      <CoronaGlobalProvider>
        <Content />
      </CoronaGlobalProvider>
    </Fragment>
  );
}

export default App;
