import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import MapContainer from './components/MapContainer'
import './App.css'

function App () {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/map" component={MapContainer} />
      </Switch>
    </Router>
    </div>
  )
}

export default App
