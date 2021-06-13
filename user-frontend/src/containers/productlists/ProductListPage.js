import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductStore from './productstore/ProductStore'
import './ProductListStyle.css'

const ProductListPage = (props) => {
  return (
    <Layout>
      <ProductStore {...props} />
    </Layout>
  )
}

export default ProductListPage
