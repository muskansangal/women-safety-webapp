import React, { Component } from 'react';
import  { Redirect,Link } from 'react-router-dom';
import alertify from 'alertifyjs';

class Login extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      email: "",
      password : "",
      redirect: false
    };
  }

  handleChange = (evt) => { 
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  loginUser = (e) => {
    e.preventDefault();
    console.log('Click happened submit');
    const { email, password }=this.state;
    console.log(email, password,"hey");
    fetch("http://localhost:9000/check", {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
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
    let { email, password}=this.state;

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
            <span className="h3">Login</span>
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
                  onClick={this.loginUser}
              >
                  Login
              </button>
            </form>
            <Link to="/">Don't have an account?Register now</Link>
          </div>
        </div>

    );
  }
  
}

export default Login;
