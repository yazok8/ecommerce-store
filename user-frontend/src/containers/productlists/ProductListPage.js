import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductStore from './productstore/ProductStore'
import ProductPage from './productpage/ProductPage'
import './ProductListStyle.css'
import GetParams from '../../utlis/GetParams'

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props)
    const params = GetParams(props.location.search)

    let content = null
    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />
        break
      case 'page':
        content = <ProductPage {...props} />
        break
      default:
        content = null
    }
    return content
  }

  return <Layout>{renderProduct()}</Layout>
}

export default ProductListPage
