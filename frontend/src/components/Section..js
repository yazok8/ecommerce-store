import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Sections = ({ products }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/collection/list/${products._id}`}>
        <Card.Title src={products.title} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/collection/list/${products._id}`}>
          <Card.Title as="div">
            <strong>{products.title}</strong>
            <Card.Img src={products.image} variant="top" />
          </Card.Title>
        </Link>
        {/* 
        <Card.Text as="div">
          <Rating
            value={s.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        <Card.Text as="h3"> ${products.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Sections
