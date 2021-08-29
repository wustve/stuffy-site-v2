import React, { Component } from "react";

import {Route, NavLink, HashRouter} from "react-router-dom";

import Home from "../Home";
import Info from "../Info";
 
export default class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Stuffy Site</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/info">Info</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/info" component={Info}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}