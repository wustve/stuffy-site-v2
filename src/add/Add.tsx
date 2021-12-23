import React, { Component } from "react";
import StuffyForm from "../stuffyform/StuffyForm"
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'

export default class Add extends Component<{}, {}> {
     constructor(props: any) {
          super(props);
     }

     generateEmptyData() {
          return {name: "", animal_type: "", image: "", owner: "", name_origin: "", origin: "", other_notes: ""}  
     }

     render() {
          return (
               <StuffyForm isAdd={true} articleData={this.generateEmptyData()} exit={() => {window.location.href='/home';}}/>
          );
     }
}