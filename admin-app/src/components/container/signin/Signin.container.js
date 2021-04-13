import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { login } from '../../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Layout from '../../layouts/header.layout'

const Signin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()

    const user = {
      email,
      password,
    }
    dispatch(login(user))
  }

  if (auth.authenticate) {
    return <Redirect to={'/'} />
  }

  return (
    <Layout sidebar>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleChange}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="Email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>

                <Form.Group onSubmit={handleChange}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="Password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form.Group>
              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Signin
