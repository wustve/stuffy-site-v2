import React, { Component } from "react";
import StuffyForm from "../stuffyform/StuffyForm"
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'

export default class Add extends Component<{match : any, history : any}, {}> {
     constructor(props: any) {
          super(props);
          this.afterSubmit = this.afterSubmit.bind(this);
     }

     afterSubmit() {
          return;
     }

     render() {
          console.log(this.props.match.url);
          return (
               <StuffyForm path={this.props.match.url} isAdd={true} exitSuccess={this.afterSubmit}/>
          );
     }
}