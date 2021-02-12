import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, BrowserRouter, Link } from "react-router-dom";
import Main from './Main';

class Header extends Component  {
  constructor(props) {
    super(props);
    console.log(this.props.email,"header")
    this.state = {
      isLoaded: false,
      resp: ""
    };
  }

  componentDidMount() {

  }
  
  render(){
    const { resp }=this.state;
    if (!this.props.email) {
      return (
        <div>
          <h1>Error</h1>
          <Link to="/">Go to Women-Safety app</Link>
        </div>
      )
    }
    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3">
          <span className="navbar-brand" >WomenSafe</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
              {/* <span className="sr-only">(current)</span> */}
                <NavLink className="nav-link" to={{ pathname: "/dashboard", state: {email: this.props.email} }}>Dashboard</NavLink>
              </li> 
              {/* <li className="nav-item">
              <NavLink className="nav-link" to={{ pathname: "/alert", state: {email: this.props.email} }}>Emergency</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to={{ pathname: "/tutorials", state: {email: this.props.email} }}>Tutorials</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={{ pathname: "/add", state: {email: this.props.email} }}>Add Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to= "/">Logout</NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown link
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li> */}
            </ul>
          </div>
        </nav>

    );
  }
  
}

export default Header;
