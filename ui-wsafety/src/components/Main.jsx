import React, { Component } from 'react';
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import Emergency from './Emergency';
import Tutorials from './Tutorials';
import AddContact from './AddContact';
import { Route,Switch } from "react-router-dom";

class Main extends Component  {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render(){
    const { }=this.state;
    return (
          <Switch>
          <Route
            path="/alert"
            component={Emergency}
          />
          <Route
            path="/"
            component={Register} 
            exact 
          />
          <Route
            path="/login"
            component={Login} 
          />
          <Route
            path="/dashboard"
            component={Landing} 
          />
           <Route
            path="/add"
            component={AddContact} 
          />
          <Route
            path="/tutorials"
            component={Tutorials}
          />
          </Switch>
    );
  }
  
}

export default Main;


