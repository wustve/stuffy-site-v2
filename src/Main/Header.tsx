import React, { Component } from "react";
import {Route, NavLink, HashRouter} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import './Header.scss';

export default class Header extends Component<{stevenStuffy: StuffyMenuData, monicaStuffy: StuffyMenuData}, {}> {
     getLink(name: string, animal_type: string) {
          return ('/' + name.split(' ').join('_') + '/' + animal_type.split(' ').join('_') +'#active');
     }

     render() {
          return (
               <div id="header">
                    <div id="login-housing"> 
                         <NavLink to='/login'>Login</NavLink>  
                         <NavLink to='/add-stuffy'>Add New Stuffy</NavLink>
                    </div>
                    <NavLink to={this.getLink(this.props.stevenStuffy.name, this.props.stevenStuffy.animal_type)}>Steven's stuffy of the day</NavLink>
                    <NavLink to={this.getLink(this.props.monicaStuffy.name, this.props.monicaStuffy.animal_type)}>Monica's stuffy of the day</NavLink>
                    <div id="toggle-housing">
                         <label className="toggle">
                              <input type = "checkbox" id = "darkLight"/>
                              <span id = "slider">{'\u263C'}</span>
                         </label>
                    </div>
               </div>
          );
     }
}