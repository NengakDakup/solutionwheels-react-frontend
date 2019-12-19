import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import jwt_decode from 'jwt-decode'

import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Search from './pages/Search'
import Item from './pages/Item'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications';
import Reset from './pages/Reset';
import SetToken from './components/content/SetToken';
import _404 from './components/content/404'
import './App.css';
import './animate.min.css'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route path="/search/:query" component={Search} />
        <Route path="/question/:title" component={Item} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/admin" component={Admin} />
        <Route path="/reset" component={Reset} />
        <Route path="/settoken/:token" component={SetToken} />
        <Route component={_404} />
        {/* <Route path="/profile" component={Profile} />
        <Route path="/ask" component={Ask} /> 
        <Route path="/category/:cat" component={Category} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
