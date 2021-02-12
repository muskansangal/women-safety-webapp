import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import alertify from 'alertifyjs';
import  { Redirect,Link } from 'react-router-dom';

class Landing extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  componentDidMount() {

  }
  
  render(){
    const { resp }=this.state;
    if (!this.props.location.state.email) {
      return (
        <div>
          <h1>Error</h1>
          <Link to="/">Go to Women-Safety app</Link>
        </div>
      )
    }
    if (this.state.redirect) {
      return <Redirect to={{ 
          pathname: "/alert", 
          state: {email: this.props.location.state.email} 
         }} />
    }
    return (
      <div>
        <Header email={this.props.location.state.email}/>
        <div className="mt-5" style={{height:"4rem"}}>
        </div>
        <div className="row col-6 mt-5 mx-auto p-5 justify-content-center" style={{background:"red",cursor:"pointer"}} onClick={this.setRedirect}>
            <h1 style={{color:"white"}}>Emergency alert</h1>
        </div>
      </div>
    );
  }
  
}

export default Landing;
