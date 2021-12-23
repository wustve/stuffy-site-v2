import React, { Component } from "react";
import StuffyForm from "../stuffyform/StuffyForm"
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'

export default class Add extends Component<{match : any}, {}> {
     constructor(props: any) {
          super(props);
     }

     render() {
          console.log(this.props.match.url);
          return (
               <StuffyForm path={this.props.match.url} isAdd={true}/>
          );
     }
}