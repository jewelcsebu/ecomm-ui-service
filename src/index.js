import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App2";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";

import { Gprov } from "./Context";
const persistedState = loadState();
const store = createStore(rootReducer, persistedState);


// store.subscribe(() => {
//   saveState(store);
// });

ReactDOM.render(
  <Provider store={store}>
    <Gprov>
      <App />
    </Gprov>
    
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
