import React, { Component } from 'react';
import  { Link, Redirect } from 'react-router-dom';
import alertify from 'alertifyjs';
import Header from './Header';

class AddContact extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      email: "",
      emrgContact: "",
      emrgMail: "",
      relationship: "",
      nameofEC: ""
    };
  }

  handleChange = (evt) => { 
    this.setState({
      [evt.target.id]: evt.target.value
    });
  }

  addContact = (e) => {
    e.preventDefault();
    console.log('Click happened submit');
    let email=this.props.location.state.email;
    const { emrgContact, relationship, nameofEC, emrgMail }=this.state;
    fetch("http://localhost:9000/add", {
        method: 'POST',
        headers: {
        'Content-type': 'application/json'
      },
        body: JSON.stringify({
          email: email,
          emrgContact: emrgContact,
          nameofEC: nameofEC,
          emrgMail: emrgMail,
          relationship: relationship
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
              emrgContact: "",
              emrgMail: "",
              relationship: "",
              nameofEC: ""
            })
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
    let { email, password, contact, emrgMail }=this.state;
    if (!this.props.location.state.email) {
      return (
        <div>
          <h1>Error</h1>
          <Link to="/">Go to Women-Safety app</Link>
        </div>
      )
    }
    return (
      
      <React.Fragment>
        <Header email={this.props.location.state.email}/>
          <div className="row mx-auto col-6 mt-5 d-flex bg-primary justify-content-center text-white">
            <span className="h3">Add contact info</span>
          </div>
        <div className="card col-6 mx-auto login-card mt-2 hv-center">
            <form>

              <div className="form-group text-left mt-2">
              <label htmlFor="exampleInputemrgMail">Email address</label>
              <input type="email" 
                      className="form-control" 
                      id="emrgMail"
                      aria-describedby="emailEmrgHelp" 
                      placeholder="Enter emergency email"
                      onChange={this.handleChange}
              />
              </div>

              <div className="form-group text-left">
              <label htmlFor="exampleInputContact">Contact no</label>
              <input type="text" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="email"
                      aria-describedby="emailHelp" 
                      placeholder="Enter email"
              />
              </div>

              <div className="form-group text-left">
              <label htmlFor="exampleInputContact">Name of Person</label>
              <input type="text" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="nameofEC"
                      aria-describedby="nameHelp" 
                      placeholder="Enter name of emergency contact"
              />
              </div>
              <div className="form-group text-left">
              <label htmlFor="exampleInputrel">Relationship</label>
              <input type="text" 
                      className="form-control" 
                      onChange={(e)=>this.handleChange(e)}
                      id="relationship"
                      aria-describedby="nameHelp" 
                      placeholder="Enter elationship with emergency contact"
              />
              </div>

              
              <button 
                  type="submit" 
                  className="btn btn-primary mb-3"
                  onClick={this.addContact}
              >
                  Register
              </button>
            </form>
          </div>
        </React.Fragment>

    );
  }
  
}

export default AddContact;
