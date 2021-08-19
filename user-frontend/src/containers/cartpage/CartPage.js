import React from 'react'
import Layout from '../../components/layout/Layout'
import Card from '../../components/UI/card/Card'
import './CartPage.style.css'

const CartPage = (props) => {
  return (
    <Layout>
      <div className="cartContainer">
        <Card headerLeft={`My Cart`} headerRight={<div>Deliver to </div>}>
          <div className="cartHeader">
            <div>My Cart</div>
            <div>Deliver To</div>
          </div>
          <div className="flexRow">
            <div className="cartProductContainer">
              <img src="" />
            </div>
            <div className="cartItemDetails">
              <div>product name</div>
              <div>Delivery in 3 - 5 days</div>
            </div>
          </div>
        </Card>
        <Card style={{ width: '500px' }}>Price</Card>
      </div>
    </Layout>
  )
}

export default CartPage
