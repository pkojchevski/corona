import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavbarComponent({ location }) {
  // console.log("location:", location);
  return (
    <Navbar bg="light" fixed="bottom">
      <Nav fill justify className="w-100">
        <Nav.Item>
          <NavLink
            to="daily"
            activeClassName="active"
            className={location.pathname === "/" ? "active" : null}
          >
            Daily
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="overall" activeClassName="active">
            Overall
          </NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default withRouter(NavbarComponent);
