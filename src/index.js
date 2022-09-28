import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import { PizzaInputProvider } from "./context/PizzaInputContext";
import { NetworkProvider } from "./context/NetworkContext";

import App from './App';
import Category from './pages/Category';
import TasteMeter from './pages/TasteMeter';
import Price from "./pages/Price";
import Conclusion from "./pages/Conclusion";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";

import Header from "./components/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper">
      <Header/>
      <PizzaInputProvider>
        <NetworkProvider>
          
            <Router>
             <Switch>
                <Route exact path="/">
                  <App/>
                </Route>
                <Route path="/category">
                  <Category/>
                </Route>
                <Route path="/taste">
                  <TasteMeter/>
                </Route>
                <Route path="/price">
                  <Price/>
                </Route>
                <Route path="/other">
                  <Conclusion/>
                </Route>
                <Route path="/discover">
                  <Discover/>
                </Route>
                <Route path="/profile">
                  <Profile/>
                </Route>
             </Switch>
            </Router>
            
        </NetworkProvider>
        </PizzaInputProvider>
      </div>
  </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();