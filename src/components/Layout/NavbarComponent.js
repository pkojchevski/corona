import React from "react";

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavbarComponent() {
  return (
    <Navbar bg="light" fixed="bottom">
      <Nav fill justify className="w-100" defaultActiveKey="/daily">
        <Nav.Item>
          <Link to="/daily">Daily</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/overall">Overall</Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
