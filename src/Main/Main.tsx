import React, { Component } from "react";
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";

import Home from "../home/home";
import Header from "../header/Header";
import Article from "../article/article";
import { MainData } from '../../interfaces/MainData'
import Menu from "../menu/menu";
import Add from "../add/Add";
import './Main.scss'
import 'typeface-roboto';
import './colourmode.scss';
import Login from "../login/login";
import LinearProgress from "@mui/material/LinearProgress";

export default class Main extends Component<{}, { isLoaded: boolean, error: any, mainData: MainData, loggedIn: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      mainData: null,
      loggedIn: false,
    }

    this.updateLogin = this.updateLogin.bind(this);
  }

  fetchMenu = () => {
    fetch('/menu')
      .then(res => res.json())
      .then((res: MainData) => this.setState({
        isLoaded: true,
        mainData: res,
        loggedIn: res.loggedIn,
      }),
        err => this.setState({
          isLoaded: true,
          error: err,
        })
      );
  }

  componentDidMount() {
    this.fetchMenu();
  }
  
  updateLogin(state: boolean) {
    this.setState({
      loggedIn: state,
    });
  }

  render() {
    if (this.state.error) {
      return <div className="body">error {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return  <LinearProgress />;
    } else {
      return (
        <div className="body">
          <HashRouter>
            <Header stevenStuffy={this.state.mainData.stevenStuffy} monicaStuffy={this.state.mainData.monicaStuffy} loggedIn = {this.state.loggedIn} updateLogin = {this.updateLogin}/>
            <Menu options={this.state.mainData.options}></Menu>
            <div className="content">
              <Switch>
                <Route exact path="/" render={props => <Home stevenStuffy={this.state.mainData.stevenStuffy} monicaStuffy={this.state.mainData.monicaStuffy} {...props}></Home>} />
                <Route path="/add-stuffy" render={props => <Add fetchMenu={this.fetchMenu} {...props}></Add>}/>
                <Route path="/login" render={props => <Login updateLogin = {this.updateLogin} {...props} />}/>
                <Route exact path="/:id" render={props => <Article fetchMenu={this.fetchMenu} loggedIn={this.state.loggedIn} {...props}></Article>}/>
              </Switch>
            </div>
          </HashRouter>
        </div>

      );
    }
  }
}