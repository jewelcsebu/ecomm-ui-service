import React, { Component, createContext } from "react";
import { loadState } from "./localStorage";
var axios = require('axios');
export const globalC = createContext();
export class Gprov extends Component {  
  state = {
    authLogin: null,
    authLoginerror: null,
    authLoginDetail:null,
    token:null,
    auth:null
  };
  
  loginData = async (data) => {
    var config = {
        method: 'get',
        url: 'http://localhost:9191/oauth/check_token?token='+data?.access_token,
        headers: { 
          'Authorization': 'Basic d2ViOnNlY3JldA=='
        }
      };
      
      axios(config)
      .then(response => {
          console.log("called")
        this.setState(prevState => {
          return {
            authLogin: response.data,
            token:data.access_token,
          };
        },async () => {
         const user = this.userData(response.data.user_name)
         console.log('callback',user)
        }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    userData = (username) =>{
        var config = {
            method: 'get',
            url: 'http://localhost:9191/api/v1/auth-service/user/'+username,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            this.setState({
                authLoginDetail:JSON.stringify(response.data)
            })
              console.log('user data ',JSON.stringify(response.data))
        })
          .catch(function (error) {
            console.log(error);
          });
    }
  componentDidMount() {
        var localState = loadState();
        this.loginData(localState);
  }
  render() {
    return (
      <globalC.Provider
        value={{
          ...this.state
        }}>   
        {this.props.children}
      </globalC.Provider>
    );
  }
}
