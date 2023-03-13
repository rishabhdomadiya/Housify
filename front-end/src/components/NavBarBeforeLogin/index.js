/**
 * @author Kushang Arunbhai Mistry (B00870521)
 * A Navbar, after login the user (as of now this is the basic navbar which will be visible)
 */

import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logo from "../../Resources/housify-logo-white.png";

function NavBarBeforeLogin() {
  return (
    <>
      <Navbar fixed="top" className="navbar-color navbar navbar-dark">
        <Container>
          <NavLink to="/sign-in">
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
              <NavLink to="/sign-in" className="nav-text-color">
                Sign-in
              </NavLink>

              <NavLink to="/sign-up" className="nav-text-color">
                Sign-up
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarBeforeLogin;
