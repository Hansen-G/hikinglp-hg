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
import LocationTest from './components/Location';
import AllLocation from './components/AllLocation';
import AI from './components/AI';

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
        <ProtectedRoute path='/locations/new' exact={true}>
          <CreateLocation />
        </ProtectedRoute>
        <Route path='/locations/:locationId'>
          <LocationDetails />
          <AI />
       </Route>

        <Route exact={true} path='/alllocation'>
          <AllLocation />
          <AI />
        </Route>

        <Route exact={true} path='/test'>
          <AI />
        </Route>

        <Route path='/test'>
          <LocationTest />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
          <AI />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
