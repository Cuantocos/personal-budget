import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

export default function Navigationbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Personal Budget</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/home">
            Home
          </Link>

          <Link className="nav-link" to="/income">
            Income
          </Link>

          <Link className="nav-link" to="/expenses">
            Expenses
          </Link>

          <Link className="nav-link" to="/categories">
            Categories
          </Link>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown title="User" alignRight>
            <NavDropdown.Item>My profile</NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item>Close session</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
