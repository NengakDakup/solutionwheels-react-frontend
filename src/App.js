import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Search from './pages/Search'
import Item from './pages/Item'
import Notifications from './pages/Notifications';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route path="/search/:query" component={Search} />
      <Route path="/question/:title" component={Item} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/profile" component={Profile} />
      <Route path="/ask" component={Ask} /> 
      <Route path="/category/:cat" component={Category} /> */}
    </BrowserRouter>
  );
}

export default App;
