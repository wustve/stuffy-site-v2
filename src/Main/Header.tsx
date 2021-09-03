import React, { Component } from "react";
import {Route, NavLink, HashRouter} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import './Header.scss';

export default class Header extends Component<{stevenStuffy: StuffyMenuData, monicaStuffy: StuffyMenuData}, {lightMode: boolean, toggleIcon: string}> {
     constructor(props) {
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
          const colourMode = localStorage.getItem('colour-mode');
          let html = document.querySelector("html");
          console.log(colourMode);
          if (colourMode) {
               html.setAttribute("colour-mode", colourMode);
               this.setState({
                    lightMode: colourMode === 'light',
                    toggleIcon: colourMode === 'light'? '\u263C' : '\u263E'
               });
          }
     }

     handleColourToggle = ({target}) => {
          let html = document.querySelector("html");
          if (target.checked) {
               html.setAttribute("colour-mode", 'light');
               localStorage.setItem('colour-mode', 'light');
               this.setState({
                    lightMode: true,
                    toggleIcon: '\u263C'
               });
          } else {
               html.setAttribute("colour-mode", 'dark');
               localStorage.setItem('colour-mode', 'dark');
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
                    <NavLink to={this.getLink(this.props.stevenStuffy)}>Steven's stuffy of the day</NavLink>
                    <NavLink to={this.getLink(this.props.monicaStuffy)}>Monica's stuffy of the day</NavLink>
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