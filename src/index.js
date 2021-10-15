import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { PizzaInputProvider } from "./context/PizzaInputContext";

import App from './App';
import TasteMeter from './pages/TasteMeter';
import Header from "./components/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper">
      <Header/>
        <PizzaInputProvider>
          <Router>
           <Switch>
              <Route exact path="/">
                <App/>
              </Route>
              <Route path="/taste">
                <TasteMeter/>
              </Route>
           </Switch>
          </Router>
        </PizzaInputProvider>
      </div>
  </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();