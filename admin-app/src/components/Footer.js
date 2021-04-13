import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <footer style={{ position: 'absolute', bottom: '0', width: '100%' }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Zing Vibes Store
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
