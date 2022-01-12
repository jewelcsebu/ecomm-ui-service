

import { encode } from "base-64";
import React, { lazy, Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../axios";

var axios = require('axios');
var qs = require('qs');
const querystring = require('querystring');


const SignInForm = lazy(() => import("../../components/account/SignInForm"));

class SignInView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };

    // this.username = 'web';
    // this.password = '$10$/9yZ7a480OSyv3U3c5mtVug2qVDnneMU7odrfpoO0dpJuI9kCS7k2';
    // this.basicAuth = 'Basic ' + (this.state.username + ':' + this.state.password);
  }

state = {
  token:"",
}


//   username = 'web'
//  password = '$10$/9yZ7a480OSyv3U3c5mtVug2qVDnneMU7odrfpoO0dpJuI9kCS7k2';
//  basicAuth = 'Basic ' + (username + ':' + password);

    // fetch(
    //   "http://localhost:9191/oauth/token",
    //   {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/x-www-form-encoded",
    //       'authorization':"Basic d2ViOndlYg==",
    //     },
    //     grant_type:'client_credentials',
    //     body: "username=jewel&password=password"
    //   }
    // )

     //?username=username&password=password&grant_type=password
    // const res = authService.post('oauth/token',
    // {
    //   // method: "POST",
    // //   headers: { 
    // //     "Content-Type": "application/x-www-form-urlencoded" //  doesn't support json
    // //   },
    // // auth: {
    // //     username: "web", // This is the client_id
    // //     password: "web" // This is the client_secret
    // //   },
    //   body: data //JSON.stringify(data)
    // })
    //  console.log(res)




  onSubmit = async (values) => {



var data = qs.stringify({
  'grant_type': 'password',
  'username': 'jewelcsebu',
  'password': '@password@' 
});
var config = {
  method: 'post',
  url: 'http://localhost:9191/oauth/token',
  headers: { 
    'Authorization': 'Basic d2ViOnNlY3JldA==', 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Cookie': 'JSESSIONID=F020526824B644534600EDFDB1FCF070'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});



  //  const  headers= { 
  //     'accept': 'application/json',
  //     'authorization':"Basic d2ViOnNlY3JldA==",
  //     'content-type': "application/x-www-form-urlencoded" //  doesn't support json
  //   }




  //   const data =  {
  //     // client_id:'client',
  //     // grant_type:'password',
  //     username:'jewelcsebu', 
  //     password:'@password@' 
  //   }
  //   authService.post('oauth/token',
  //     {
  //       grant_type:'password',
  //       username:'jewelcsebu', 
  //       password:'@password@'
  //   },
  //   {
  //     headers: headers
  //   }
    
  //   )
  //   .then(res => console.log(res.data))
   
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
