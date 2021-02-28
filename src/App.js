import React, { useState, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { UserContext } from './context/UserContext'
import LandingPage from './components/LandingPage'
import MapContainer from './components/Map/index'
import SignUp from './components/SignUp'
import './App.css'

function App () {
  /* eslint-disable-next-line */
  const [userData, setUserData] = useState(null)
  const userValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData])
  return (
    <div className="App">
    <UserContext.Provider value={userValue}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/map" component={MapContainer} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
    </UserContext.Provider>
    </div>
  )
}

export default App
