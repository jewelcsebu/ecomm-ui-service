


import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../axios";
var axios = require("axios");


const SignInForm = lazy(() => import("../../components/account/SignInForm"));

class SignInView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    this.username = 'web';
    this.password = '$10$/9yZ7a480OSyv3U3c5mtVug2qVDnneMU7odrfpoO0dpJuI9kCS7k2';
    this.basicAuth = 'Basic ' + (this.state.username + ':' + this.state.password);
  }

state = {
  token:"",
}


//   username = 'web'
//  password = '$10$/9yZ7a480OSyv3U3c5mtVug2qVDnneMU7odrfpoO0dpJuI9kCS7k2';
//  basicAuth = 'Basic ' + (username + ':' + password);


  onSubmit = async (values) => {

    // axios.request({
    //   url: "/oauth/token",
    //   method: "post",
    //   baseURL: "http://localhost:9191/",
    //   headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" },

    //   auth: {
    //     username: "jewel", // This is the client_id
    //     password: "password" // This is the client_secret
    //   },
    //   data: {
    //     "grant_type": "password",
    //     "scope": "public"    
    //   }
    // }).then(respose => {
    //   console.log(respose);  
    // }); 

    
    authService.post('oauth/token?grant_type=password&username=jewel&password=password',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientId: "web",
        clientSecret: "web",
        // scope: "user_info"
      })
    })
     
  };


  render() {
    return (
      <div className="container my-3">
        <div className="row border">
          <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
            <Link to="/">
              <img
                src="../../images/banner/Dell.webp"
                alt="..."
                className="img-fluid"
              />
            </Link>
            <Link to="/">
              <img
                src="../../images/banner/Laptops.webp"
                alt="..."
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="col-md-6 p-3">
            <h4 className="text-center">Sign In</h4>
            <SignInForm onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default SignInView;
