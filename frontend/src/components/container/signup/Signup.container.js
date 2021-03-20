import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from '../../UI/input/Input.ui'

function Signup() {
  return (
    <Container>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Input
              label="Full name:"
              placeholder="Full name"
              value=""
              type="text"
              onChange={() => {}}
            ></Input>
            <Input
              label="Email address:"
              placeholder="Email Address"
              value=""
              type="email"
              onChange={() => {}}
            ></Input>
            <Input
              label="Password:"
              placeholder="password"
              value=""
              type="password"
              onChange={() => {}}
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
