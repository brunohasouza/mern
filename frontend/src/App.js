import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import User from './user/pages/User'
import NewPlace from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './user/pages/Auth'
import { AuthContext } from "./shared/context/auth-context"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route
          path="/"
          exact
          component={User}
        />
        <Route
          path="/places/new"
          exact
          component={NewPlace}
        />
        <Route 
          path="/places/:placeId"
          exact
          component={UpdatePlace}
        />
        <Route 
          path="/:userId/places"
          exact
          component={UserPlaces}
        />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route
          path="/"
          exact
          component={User}
        />
        <Route 
          path="/:userId/places"
          exact
          component={UserPlaces}
        />
        <Route 
          path="/auth"
          exact
          component={Auth}
        />
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      <Router>
        <MainNavigation />
        <main>
          { routes }
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;