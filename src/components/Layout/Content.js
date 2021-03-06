import React from "react";

import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import NavbarComponent from "./NavbarComponent";
import Daily from "../../pages/Daily";
import Overall from "../../pages/Overall";

const Content = () => {
  return (
    <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
      <NavbarComponent />
      <Switch>
        <Route exact path="/" component={Daily}></Route>
        <Route exact path="/daily" component={Daily}></Route>
        <Route exact path="/overall" component={Overall}></Route>
      </Switch>
    </Container>
  );
};
export default Content;
