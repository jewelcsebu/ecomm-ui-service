var axios = require('axios');

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }

      const data = JSON.parse(serializedState);
      console.log('local',data)

      // var config = {
      //   method: 'get',
      //   url: 'http://localhost:9191/oauth/check_token?token=eff06d7f-21d6-4d41-88f5-896ade492800',
      //   headers: { 
      //     'Authorization': 'Basic d2ViOnNlY3JldA==', 
      //     'Cookie': 'JSESSIONID=8D5AB3217F66157AFED0001C36566D43'
      //   }
      // };
      
      // axios(config)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });


      return data;
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);

      

      

      
    } catch {
      // ignore write errors
    }
  };
  