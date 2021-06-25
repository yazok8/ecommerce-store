import React from 'react'
import './App.css'
import Homepage from './containers/hompage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/productlists/ProductListPage'
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
