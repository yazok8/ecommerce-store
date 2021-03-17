import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Sections from '../components/Section.'

const Collectionscreen = ({ products }) => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const fetchSections = async () => {
      const { data } = await axios.get('/api/collection/list')
      console.log(data)

      setSections(data)
    }

    fetchSections()
  }, [])

  return (
    <>
      <h1>Yoga</h1>
      <Row>
        {sections.map((products, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <Sections products={products} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Collectionscreen
