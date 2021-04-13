import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../actions/actions'

const Header = () => {
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav className="ml-auto" style={{ float: 'right' }}>
        {/* <Link to="/shop" className="nav-link">
          <i className="fas fa-shopping-bag"></i> Shop
        </Link> */}
        <span className="nav-link" onClick={logout}>
          <i className="fas fa-user"></i> Sign Out
        </span>
      </Nav>
    )
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav className="ml-auto" style={{ float: 'right' }}>
        <Link to="/signin" className="nav-link">
          <i className="fas fa-user"></i> Sign In
        </Link>
        <Link to="/signup" className="nav-link">
          <i className="fas fa-user-plus"></i> Sign Up
        </Link>
        <Link to="/cart" className="nav-link">
          <i className="fas fa-shopping-cart"></i>Cart
        </Link>
      </Nav>
    )
  }

  return (
    <Navbar bg="light" expand="lg" collapseOnSelect style={{ zIndex: '1' }}>
      <Container fluid>
        <Link to="/" className="nav-link">
          <Navbar.Brand>
            <img
              className="img-responsive"
              src="/ZingImages/logo.png"
              alt="Chania"
              style={{ width: '60px' }}
            ></img>
          </Navbar.Brand>
        </Link>
        <h3>Admin Dashboard</h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>

          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
