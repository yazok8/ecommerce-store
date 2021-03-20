import React from 'react'
import { Jumbotron } from 'react-bootstrap'

function Home() {
  return (
    <div>
      <Jumbotron
        className="text-center"
        style={{ margin: '5rem', background: 'white' }}
      >
        <h3>Welcome to Admin Dashboard</h3>
      </Jumbotron>
    </div>
  )
}

export default Home
