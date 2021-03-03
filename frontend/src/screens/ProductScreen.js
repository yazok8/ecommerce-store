import React from 'react'
import {Link} from "react-router-dom"
import {Row, Col, Image, ListGorup, Card, Button, ListGroup} from "react-bootstrap"
import products from "../products"
import Rating from "../components/Rating"

const ProductScreen = ({match}) => {
     
    console.log(match)
    const product= products.find(p => p._id === match.params.id)
    console.log(product.name);

    return (

        <div>
          <div>{product.name}</div>
          <Link className= "btn btn-dark my-3" to = "/">Go Back</Link>
         
          <Row>
            <Col md= {6}>
              <Image src = {product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>

                <ListGroup variant= 'flush'>
                  <ListGroup.Item>
                    <h3> 
                      {product.name}
                    </h3>
                  </ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}> 
                  </Rating>
                </ListGroup>
                <ListGroup>
                  Price: ${product.price}
                </ListGroup>
                <ListGroup>
                  description: ${product.description}
                </ListGroup>
              </Col>
              <Col md= {3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                        price</Col>
                        <Col>
                         <strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                        Status</Col>
                        <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button className= "btn-block" type="button" disabled = {product.countInStock === 0}>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

          </Row>
        </div>
    )
}

export default ProductScreen
