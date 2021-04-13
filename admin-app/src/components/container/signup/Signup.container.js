import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../UI/input/Input.ui'
import { Redirect } from 'react-router-dom'
import { signup } from '../../../actions/actions'

const Signup = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const user = {
    name,
    email,
    password,
  }
  const handleChange = (e) => {
    e.preventDefault()

    dispatch(signup(user))
  }

  if (auth.authenticate) {
    return <Redirect to={'/'} />
  }

  // if (userRegister.loading) {
  //   return <p>Loading...!</p>
  // }

  return (
    <Container>
      {user.message}
      <Row style={{ marginTop: '50px' }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleChange}>
            <Input
              label="Full name:"
              placeholder="Full name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Input
              label="Email address:"
              placeholder="Email Address"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              label="Password:"
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
