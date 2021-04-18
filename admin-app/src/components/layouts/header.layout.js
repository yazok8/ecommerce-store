import React from 'react'
import Header from '../Header'
import { Row, Col, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './styles.layout.css'

const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            {/*  */}
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={'/'} exact={true}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/products'}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={'/orders'}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to={'/category'}>Categories</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </div>
  )
}

export default Layout
