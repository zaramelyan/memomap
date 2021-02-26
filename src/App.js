import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import MapContainer from './components/Map/index'
import SignUp from './components/SignUp'
import './App.css'

function App () {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/map" component={MapContainer} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
    </div>
  )
}

export default App
