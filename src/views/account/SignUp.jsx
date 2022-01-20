import React, { lazy, useEffect, useState } from "react";

import { Link } from "react-router-dom";
var axios = require('axios');
const SingUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = () => {


  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const onSubmit = async (values) => {

    // alert(values)

    var config = {
      method: 'post',
      url: 'http://localhost:9191/api/v1/auth-service/customer/register',
      headers: {
        'Authorization': 'Basic d2ViOnNlY3JldA==',
        'Content-Type': 'application/json',
        'Cookie': 'JSESSIONID=8D5AB3217F66157AFED0001C36566D43'
      },
      data: values
    };

    axios(config)
      .then(function (response) {
        setError("")
        setSuccess("Registration Successfull! Please login!")
        console.log(JSON.stringify(response.data));
      })
      .catch(function (errors) {
        console.log(errors.response.data);

        setSuccess("")
        setError(errors.response.data.message)
        // let ServerErrors = [];
        //           $.each(errors.response.data, function(field,message) {
        //               ServerErrors.push({field:field,msg:message[0],scope:'create'})
        //           });
        //           errors.add(ServerErrors);
      });


  };



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
          <h4 className="text-center">Sign Up</h4>
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

          <SingUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );

}

export default SignUpView;
