

import { encode } from "base-64";
import React, { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../axios";
import { saveState } from "../../localStorage";
import { globalC } from "../../Context";

var axios = require('axios');
var qs = require('qs');
const querystring = require('querystring');


const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const SignInView = () => {

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = async (values) => {

    var data = qs.stringify({
      'grant_type': 'password',
      'username': values.mobileNo,
      'password': values.password
    });

    var config = {
      method: 'post',
      url: 'http://localhost:9191/oauth/token',
      headers: {
        'Authorization': 'Basic d2ViOnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded',

      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data)


        saveState(response.data)

        setSuccess("Successfully login")
        setError("");
      })
      .catch(function (error) {
        setSuccess("")
        console.log(error.response.data)
        setError(error.response.data.error_description);
      });


  }

console.log(globalC)

  return (


    <globalC>


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
          {error && (
            <div className="alert alert-danger mb-1 mt-1">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success mb-1 mt-1">
              {success}
            </div>
          )}
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>

    </globalC>

  
    // <div className="container my-3">
    //   <div className="row border">
    //     <div className="col-md-6 bg-light bg-gradient p-3 d-none d-md-block">
    //       <Link to="/">
    //         <img
    //           src="../../images/banner/Dell.webp"
    //           alt="..."
    //           className="img-fluid"
    //         />
    //       </Link>
    //       <Link to="/">
    //         <img
    //           src="../../images/banner/Laptops.webp"
    //           alt="..."
    //           className="img-fluid"
    //         />
    //       </Link>
    //     </div>
    //     <div className="col-md-6 p-3">
    //       <h4 className="text-center">Sign In</h4>
    //       {error && (
    //         <div className="alert alert-danger mb-1 mt-1">
    //           {error}
    //         </div>
    //       )}
    //       {success && (
    //         <div className="alert alert-success mb-1 mt-1">
    //           {success}
    //         </div>
    //       )}
    //       <SignInForm onSubmit={onSubmit} />
    //     </div>
    //   </div>
    // </div>
   
  );

}

export default SignInView;
