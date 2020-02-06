import React from 'react';
import { CookiesProvider } from 'react-cookie';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </Router>
  </CookiesProvider>
  );
}

export default App;
