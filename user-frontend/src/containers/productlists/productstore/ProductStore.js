import React, { useEffect, useState } from 'react'
import { getProductsBySlug } from '../../../actions/actions'
import Card from '../../../components/UI/card/Card'
import Layout from '../../../components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { generatePublicUrl } from '../../../urlConfig'
import { Link } from 'react-router-dom'

const ProductStore = (props) => {
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
    <div>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} under ${priceRange[key]}`}
            headerRight={<button>view all</button>}
          >
            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: 'block' }}
                  className="product-container"
                >
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
                </Link>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default ProductStore
