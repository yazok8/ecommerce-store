import React, { useEffect } from 'react'
import './App.css'
import Homepage from './containers/hompage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductListPage from './containers/productlists/ProductListPage'
import { isUserLoggedIn } from './actions/actions'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [auth.authenticate])

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
