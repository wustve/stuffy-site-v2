import React, { Component } from "react";
import {Route, NavLink, HashRouter} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'
import './Header.scss';

export default class Header extends Component<{stevenStuffy: StuffyMenuData, monicaStuffy: StuffyMenuData}, {lightMode: boolean, toggleIcon: string}> {
     constructor(props: any) {
          super(props);
          this.state = {
               lightMode: false,
               toggleIcon: '\u263E'
          }
     }
     getLink(stuffy: StuffyMenuData) {
          return ('/' + stuffy.name.split(' ').join('_') + '/' + stuffy.animal_type.split(' ').join('_') +'#active');
     }

     componentDidMount = () => {
          const colourMode = localStorage.getItem(LocalStorageKey.ColourMode);
          let html = document.querySelector("html");
          console.log(colourMode);
          if (colourMode) {
               html.setAttribute(LocalStorageKey.ColourMode, colourMode);
               this.setState({
                    lightMode: colourMode === ColourMode.Light,
                    toggleIcon: colourMode === ColourMode.Light? '\u263C' : '\u263E'
               });
          }
     }

     handleColourToggle = ({target}) => {
          let html = document.querySelector("html");
          if (target.checked) {
               html.setAttribute(LocalStorageKey.ColourMode, ColourMode.Light);
               localStorage.setItem(LocalStorageKey.ColourMode, ColourMode.Light);
               this.setState({
                    lightMode: true,
                    toggleIcon: '\u263C'
               });
          } else {
               html.setAttribute(LocalStorageKey.ColourMode, ColourMode.Dark);
               localStorage.setItem(LocalStorageKey.ColourMode, ColourMode.Dark);
               this.setState({
                    lightMode: false,
                    toggleIcon: '\u263E'
               });
          }
     }

     render() {
          return (
               <div id="header">
                    <div id="login-housing"> 
                         <NavLink to='/login'>Login</NavLink>  
                         <NavLink to='/add-stuffy'>Add New Stuffy</NavLink>
                    </div>
                    <NavLink to={this.getLink(this.props.stevenStuffy)} activeClassName='active'>Steven's stuffy of the day</NavLink>
                    <NavLink to={this.getLink(this.props.monicaStuffy)} activeClassName='active' >Monica's stuffy of the day</NavLink>
                    <div id="toggle-housing">
                         <label className="toggle">
                              <input type = "checkbox" id = "darkLight" checked={this.state.lightMode} onChange={this.handleColourToggle}/>
                              <span id = "slider">{this.state.toggleIcon}</span>
                         </label>
                    </div>
               </div>
          );
     }
}