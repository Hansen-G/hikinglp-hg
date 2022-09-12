import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/Homepage';
import LocationDetails from './components/LocationDetails';
import CreateLocation from './components/CreateLocation';
import Navigation from './components/Navigation';
import AllLocation from './components/AllLocation';
import AI from './components/AI';
import NotFound from './components/NotFound';
import ButtomBar from './components/ButtomBar'

import { Redirect } from 'react-router-dom';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/notfound' exact={true}>
          <NotFound />
          <ButtomBar />
        </Route>
        <ProtectedRoute path='/locations/new' exact={true}>
          <CreateLocation />
        </ProtectedRoute>

        <Route exact={true} path='/locations/all'>
          <AllLocation />
        </Route>
        <Route path='/locations/:locationId'>
          <LocationDetails />
        </Route>

        {/* <Route exact={true} path='/ai'>
          <AI />
        </Route> */}

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        {/* <Route>
          <h1>404 Page Not Found</h1>
        </Route> */}
        <Route render={() => <Redirect to={{ pathname: "/notfound" }} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
