import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Auth } from '@aws-amplify/auth';
import { useSecurity } from '../auth/UseSecurity';

function mainNavbar() {
  const navigate = useNavigate();
  // let { user } = useSecurity();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }


  const [user, setUser] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setUser("me");
      console.log("set");
    }, 10000)
  }, []);

  if (user) {
    return (
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home"><img src='./src/assets/logo.svg' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as="button" onClick={handleSignOut} style={{ background: "none", border: "none", padding: 0, color: "inherit", textDecoration: "none" }}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home"><img src='./src/assets/logo.svg' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default mainNavbar;