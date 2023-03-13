/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A Navbar, before login (however, functionality is for future implementation purposes)
 */

import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logo from "../../Resources/housify-logo-white.png";

function NavBarAfterLogin() {
  const handleSignOut = () => {
    localStorage.clear();
  };

  return (
    <Navbar fixed="top" className="navbar-color navbar navbar-dark" expand="lg">
      <Container>
        <NavLink to="/dashboard">
          <img
            src={Logo}
            width="60"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-text-color me-auto">
            <Nav.Item className="p-2">
              <NavLink to="/dashboard" className="nav-text-color">
                Dashboard
              </NavLink>
            </Nav.Item>

            <Nav.Item className="p-2">
              <NavLink to="/UpdateApplicationStatus" className="nav-text-color">
                Update Application Status
              </NavLink>
            </Nav.Item>

            <Nav.Item className="p-2">
              <NavLink to="/ViewApplicationStatus" className="nav-text-color">
                View Application Status
              </NavLink>
            </Nav.Item>

            <Nav.Item className="p-2">
              <NavLink to="/forum" className="nav-text-color">
                Forum
              </NavLink>
            </Nav.Item>

            <Nav.Item className="p-2">
              <NavLink to="/houses" className="nav-text-color">
                Manage Rentals
              </NavLink>
            </Nav.Item>

            <Nav.Item className="p-2">
              <NavLink to="/reviews" className="nav-text-color">
                Reviews
              </NavLink>
            </Nav.Item>
          </Nav>

          <Nav.Item className="ms-auto p-2">
            <NavLink to="/profile" className="nav-text-color me-3">
              Profile
            </NavLink>
            <NavLink
              to="/sign-in"
              onClick={handleSignOut}
              className="nav-text-color"
            >
              Sign out
            </NavLink>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarAfterLogin;
