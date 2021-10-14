import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { PizzaInputProvider } from "./context/PizzaInputContext";

import App from './App';
import FindPlace from './pages/FindPlace';
import TasteMeter from './pages/TasteMeter';

import Header from "./components/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import reportWebVitals from './reportWebVitals';


const render = (status) => {
  if (status === Status.LOADING) return <p>loading...</p>
  if (status === Status.FAILURE) return <p>Error :(</p>
  return null
}


ReactDOM.render(
  <React.StrictMode>
    <Header/>
      <PizzaInputProvider>
        <Router>
         <Switch>
            <Route exact path="/">
              <App/>
            </Route>
            <Route path="/findplace">
              <Wrapper apiKey={process.env.REACT_APP_GG_KEY} render={render}>
                <FindPlace/>
              </Wrapper>
            </Route>
            <Route path="/taste">
              <TasteMeter/>
            </Route>
         </Switch>
        </Router>
      </PizzaInputProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
