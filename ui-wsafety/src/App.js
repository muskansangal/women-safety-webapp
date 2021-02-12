import React, { Component } from 'react';
import './App.css';
//import Landing from './components/Landing';
import Register from './components/Register';
import Header from './components/Header';
import Main from './components/Main';
import { BrowserRouter, NavLink } from "react-router-dom";

class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  render(){
    const { }=this.state;
    return (
      
        <div className="App">
          {/* <div>
          <Header />  */}
            <Main />
          {/* </div> */}

        </div>
    );
  }
  
}

export default App;

{/* <Link to='/'>here link</Link> */}