import styles from './NavBar.module.css'
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar expand="lg" bg='primary' className='p-3' data-bs-theme='dark'>
      <Container className="justify-content-between">
        <Navbar.Brand href="/">Blog React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
          <Nav className="me-auto gap-2">
            <Nav.Link className={styles.nav_link} href="/">Blogs</Nav.Link>
            <Nav.Link className={styles.nav_link} href="/blog/create-edit">Create a Blog</Nav.Link>
            <Nav.Link className={styles.nav_link} href="/auth">login / signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
