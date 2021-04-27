import React, { useEffect, useState } from 'react'
import { getProductsBySlug } from '../../actions/actions'
import Layout from '../../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { generatePublicUrl } from '../../urlConfig'
import './ProductlistStyle.css'

const Productlist = (props) => {
  const product = useSelector((state) => state.product)
  const [priceRange, setPriceRange] = useState({
    under30: 30,
    under40: 40,
    under50: 50,
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const { match } = props
    dispatch(getProductsBySlug(match.params.slug))
  }, [])

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="card-header">
              <div>
                {/* using key here to point to the price range in useState under 30, 40, 50 */}
                {props.match.params.slug} under {priceRange[key]}
              </div>
              <button>view all</button>
            </div>
            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((product) => (
                <div className="product-container">
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    ></img>
                  </div>
                  <div className="product-info">
                    <div style={{ margin: '5px 0s' }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>2,339</span>
                    </div>
                    <div>
                      <div className="product-price">{product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default Productlist
