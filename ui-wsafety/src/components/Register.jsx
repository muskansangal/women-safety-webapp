import React, { Component } from 'react';
import  { Redirect,Link } from 'react-router-dom';
import alertify from 'alertifyjs';

class Register extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      firstName: "",
      lastName: "",
      email: "",
      password : "",
      contact: "",
      redirect: false,
      status: 500
    };
  }

  handleChange = (evt) => { 
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  registerUser = (e) => {
    e.preventDefault();
    console.log('Click happened submit');
    const { email, password, firstName, lastName, contact }=this.state;
    console.log(email, password, firstName, lastName, contact,"hey");
    fetch("http://localhost:9000/", {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          contact: contact
        }),
        headers: {
          "Content-type": 'application/json'
        }
      })
      .then((res) => {
        this.setState({
          status: res.status
        })
        return res.json()
      })
      .then((res) => {
          if(this.state.status==200){
            alertify.success(res.msg);
            this.setState({
              redirect: true
            });
          }
          else{
            alertify.error(res.msg)
          }
        })
      .catch(err => {
          console.log(err);
          //alertify.error("error");
      });
  }

  componentDidMount() {
    
  }

  render(){
    let { email, password, contact, firstName, lastName }=this.state;

    if (this.state.redirect) {
      return <Redirect to={{ 
          pathname: "/dashboard", 
          state: {email: email} 
         }} />
    }

    return (
      
      <div>
        <div className="row col-12 d-flex bg-primary justify-content-center text-white p2">
            <span className="h1">Our Priority-Women Safety</span>
          </div>
          <div className="row mx-auto col-6 mt-3 d-flex bg-primary justify-content-center text-white">
            <span className="h3">Register</span>
          </div>
        <div className="card col-6 mx-auto login-card mt-2 hv-center">
            <form>
              <div className="form-group text-left">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="email"
                      aria-describedby="emailHelp" 
                      placeholder="Enter email"
              />
              </div>

              <div className="form-group text-left">
              <label htmlFor="exampleInputfName">First name</label>
              <input type="text" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="firstName"
                      aria-describedby="fnameHelp" 
                      placeholder="Enter first name"
              />
              </div>
              <div className="form-group text-left">
              <label htmlFor="exampleInputlname">Last name</label>
              <input type="text" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="lastName"
                      aria-describedby="lnameHelp" 
                      placeholder="Enter last name"
              />
              </div>

              <div className="form-group text-left">
              <label htmlFor="exampleInputContact">Contact no</label>
              <input type="text" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="contact"
                      aria-describedby="contactHelp" 
                      placeholder="Enter contact number"
              />
              </div>

              <div className="form-group text-left">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" 
                      className="form-control" 
                      id="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                  />
              </div>

              <button 
                  type="submit" 
                  className="btn btn-primary"
                  onClick={this.registerUser}
              >
                  Register
              </button>
            </form>
            <Link to="/login">Already have an account?Log in</Link>
          </div>
        </div>

    );
  }
  
}

export default Register;
