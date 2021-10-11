import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";

import Home from "../home/home";
import Header from "../header/Header";
import Article from "../article/article";
import { MainData } from '../../interfaces/MainData'
import Menu from "../menu/menu";
import Add from "../add/Add";
import Edit from "../edit/Edit";
import './Main.scss'
import '@fontsource/merriweather';
import './colourmode.scss';

export default class Main extends Component<{}, { isLoaded: boolean, error: any, mainData: MainData }> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      mainData: null,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/menu')
      .then(res => res.json())
      .then(res => this.setState({
        isLoaded: true,
        mainData: res
      }),
        err => this.setState({
          isLoaded: true,
          error: err,
        })
      );
  }

  render() {
    if (this.state.error) {
      return <div className="body">error {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div className="body">loading</div>
    } else {
      return (
        <div className="body">
          <HashRouter>
            <Header stevenStuffy={this.state.mainData.stevenStuffy} monicaStuffy={this.state.mainData.monicaStuffy} />
            <Menu options={this.state.mainData.options}></Menu>
            <div className="content">
              <Route exact path="/" render={props => <Home stevenStuffy={this.state.mainData.stevenStuffy} monicaStuffy={this.state.mainData.monicaStuffy} {...props}></Home>} />
              <Route path="/:name/:animal_type" component={Article}/>
              <Route path="/add" component={Add}/>
              <Route path="/add" component={Edit}/>
            </div>
          </HashRouter>
        </div>

      );
    }
  }
}