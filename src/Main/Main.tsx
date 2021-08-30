import React, { Component } from "react";
import {Route, NavLink, HashRouter} from "react-router-dom";

import Home from "../home/home";
//import Info from "../Info";
 
export default class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className = "body">
          <h1>Stuffy asdasSite</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/info">Info</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" render={props => <Home stevenStuffy = {{name: "asdasda", image: "asdasd"}} monicaStuffy={{name: "asdasda", image: "asdasd"}} {...props}></Home>}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}