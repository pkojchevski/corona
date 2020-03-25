import React from "react";

import { NavLink, Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavbarComponent() {
  return (
    <Navbar bg="light" fixed="bottom">
      <Nav fill justify className="w-100">
        <Nav.Item>
          <NavLink to="/daily" activeClassName="active">
            Daily
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/overall" activeClassName="active">
            Overall
          </NavLink>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
