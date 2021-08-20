import React from 'react'
import './card.style.css'

const Card = (props) => {
  return (
    <div className="card" {...props}>
      <div className="card-header">
        {props.headerLeft && (
          <div
            style={{
              alignSelf: 'center',
              fontSize: '20px',
              fontWeight: '500',
            }}
          >
            {/* using key here to point to the price range in useState under 30, 40, 50 */}
            {props.headerLeft}
          </div>
        )}

        {props.headerRight && props.headerRight}
      </div>
      {props.children}
    </div>
  )
}

export default Card
