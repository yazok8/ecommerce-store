import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import { AiFillThunderbolt } from 'react-icons/ai'
import { MaterialButton } from '../../components/material-ui/MaterialUI'
import { generatePublicUrl } from '../../urlConfig'
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'
import { getProductDetailsById } from '../../actions/actions'
import { addToCart } from '../../actions/actions'

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)

  useEffect(() => {
    const { productId } = props.match.params
    console.log(props)
    const payload = {
      params: {
        productId,
      },
    }
    dispatch(getProductDetailsById(payload))
  }, [])

  if (Object.keys(product.productDetails).length === 0) {
    return null
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((pic, index) => (
              <div className="thumbnail">
                <img src={generatePublicUrl(pic.img)} alt={pic.img} />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={generatePublicUrl(
                  product.productDetails.productPictures[0].img
                )}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px',
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails
                  const img = product.productDetails.productPictures[0].img
                  dispatch(addToCart({ _id, name, price, img }))
                  console.log(product.productDetails)
                  props.history.push('/cart')
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px',
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Yoga</a>
                <IoIosArrowForward />
              </li>
              {/* <li>
                <a href="#">{product.productDetails.slug}</a>
                <IoIosArrowForward />
              </li> */}
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiDollar />
              4500 off{' '}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiDollar />
                {product.productDetails.price}
              </span>
              <span className="discount" style={{ margin: '0 10px' }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: '#212121',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Available Offers
              </p>
              <p style={{ display: 'flex' }}>
                <span
                  style={{
                    width: '100px',
                    fontSize: '12px',
                    color: '#878787',
                    fontWeight: '600',
                    marginRight: '20px',
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#212121',
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailsPage
