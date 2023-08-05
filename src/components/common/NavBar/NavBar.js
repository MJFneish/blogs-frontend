import styles from './NavBar.module.css'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../../../services/apiClient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageUser } from '../functions/functions';

function NavBar() {
  const [user, setUser] = useState(useLocalStorageUser());
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const logoutRequest = async () => {
      let response;
      try {
        response = await logout();
        if (response.status === 200) {
          localStorage.removeItem('blog-user');
          localStorage.removeItem('blog-token');
          Swal.fire(
            'Success!',
            'You have been registered successfully',
            'success'
          ).then((result) => {
            localStorage.removeItem('blog-user');
            setUser(null)
            window.location.href = '/';
          });
        } else {
          Swal.fire(
            'Wait!',
            `${response.data.message}`,
            'info'
          )
        }
      } catch (error) {
        Swal.fire(
          'Oops...!',
          `${error.message}`,
          'info'
        )
      }
    };
    logoutRequest();
  }
  return (
    <Navbar expand="lg" bg='primary' className='p-3' data-bs-theme='dark'>
      <Container className="justify-content-between">
        <Navbar.Brand href="/">Blog React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
          <Nav className="me-auto gap-2">
            <Nav.Link className={styles.nav_link} href="/">Blogs</Nav.Link>
            {user && <Nav.Link className={styles.nav_link} href="/blog/create-edit">Create a Blog</Nav.Link>}
            {user && <button className={styles.nav_link} onClick={handleLogout}>logout</button>}

            {!user && <Nav.Link className={styles.nav_link} href="/auth">login / signup</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
