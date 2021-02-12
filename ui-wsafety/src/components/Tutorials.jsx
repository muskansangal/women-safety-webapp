import React, { Component } from 'react';
//import './App.css';
import Landing from './Landing';
import Header from './Header';
import alertify from 'alertifyjs';
import  { Redirect,Link } from 'react-router-dom';

class Tutorials extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      arrLinks:["https://www.youtube.com/embed/KVpxP3ZZtAc","https://www.youtube.com/embed/KVpxP3ZZtAc","https://www.youtube.com/embed/KVpxP3ZZtAc"]
    };
  }
  
  render(){
    const { arrLinks }=this.state;
    if (!this.props.location.state.email) {
      return (
        <div>
          <h1>Error</h1>
          <Link to="/">Go to Women-Safety app</Link>
        </div>
      )
    }
    return (
      <div >
          <Header email={this.props.location.state.email}/>
          {/* <div className="mt-1" style={{height:"4rem"}}>
        </div> */}
        {
            arrLinks.map((link,i)=>(
          <div className="row col-6 mt-4 mx-auto justify-content-center" key={i} style={{height:"45vh"}}>
            
                <iframe src={link}
                  frameBorder='0'
                  allow='autoplay; encrypted-media'
                  allowFullScreen
                  title='video'
                  className="row col-12"
                />  
          </div>
          ))
      }
        

      </div>
    );
  }
  
}

export default Tutorials;
