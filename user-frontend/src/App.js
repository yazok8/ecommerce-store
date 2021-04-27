import './App.css'
import Homepage from './containers/hompage/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Productlist from './containers/productlists/Productlist'
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/:slug" component={Productlist} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
