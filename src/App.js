import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './pages/Home'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      {/* <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/search" component={Search} />
      <Route path="/ask" component={Ask} /> */}
    </BrowserRouter>
  );
}

export default App;
