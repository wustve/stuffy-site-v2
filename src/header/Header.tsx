import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import { LocalStorageKey } from "../enums/LocalStorageKey";
import { ColourMode } from '../enums/ColourMode'
import './Header.scss';
import getLink from "../helpers/getlink";
import Switch from '@mui/material/Switch';
import LightModeIcon from './light_mode_icon.png';
import DarkModeIcon from './dark_mode_icon.png';
import { StyledEngineProvider } from '@mui/material/styles';

export default class Header extends Component<{
     stevenStuffy: StuffyMenuData,
     monicaStuffy: StuffyMenuData,
     loggedIn: boolean,
     updateLogin: (state: boolean) => void,
}, {
     lightMode: boolean
}> {
     constructor(props: any) {
          super(props);
          this.state = {
               lightMode: false
          }
          this.logout = this.logout.bind(this);
     }

     logout() {
          fetch('/logout', {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
               },
          })
          .then(res => {
               console.log(res)
               if (res.ok) {
                    this.props.updateLogin(false);
               }
          })
     }


     componentDidMount = () => {
          const colourMode = localStorage.getItem(LocalStorageKey.ColourMode);
          let html = document.querySelector("html");
          console.log(colourMode);
          if (colourMode) {
               html.setAttribute(LocalStorageKey.ColourMode, colourMode);
               this.setState({
                    lightMode: colourMode === ColourMode.Light
               });
          }
     }

     handleColourToggle = ({ target }) => {
          let html = document.querySelector("html");
          if (target.checked) {
               html.setAttribute(LocalStorageKey.ColourMode, ColourMode.Light);
               localStorage.setItem(LocalStorageKey.ColourMode, ColourMode.Light);
               this.setState({
                    lightMode: true
               });
          } else {
               html.setAttribute(LocalStorageKey.ColourMode, ColourMode.Dark);
               localStorage.setItem(LocalStorageKey.ColourMode, ColourMode.Dark);
               this.setState({
                    lightMode: false
               });
          }
     }

     render() {
          return (
               <div id="header">
                    <div id="login-housing">
                         {this.props.loggedIn ? <a onClick={() => this.logout()}>Logout</a> : <NavLink to='/login'>Login</NavLink>}
                         {this.props.loggedIn ? <NavLink to='/add-stuffy'>Add New Stuffy</NavLink> : null}
                    </div>
                    <NavLink to={getLink(this.props.stevenStuffy)}>Steven's stuffy of the day</NavLink>
                    <NavLink to={getLink(this.props.monicaStuffy)}>Monica's stuffy of the day</NavLink>
                    <div id="toggle-housing">
                         <StyledEngineProvider injectFirst>
                              <Switch 
                                   checked={this.state.lightMode}
                                   className="toggle"
                                   checkedIcon={<img src={LightModeIcon} width="20"/>}
                                   icon={<img src={DarkModeIcon} width="20"/>}
                                   onChange={this.handleColourToggle}
                              />   
                         </StyledEngineProvider>
                    </div>
               </div>
          );
     }
}