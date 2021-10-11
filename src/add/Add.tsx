import React, { Component } from "react";
import StuffyForm from "../stuffyform/StuffyForm"
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'
import './Header.scss';

export default class Add extends Component<{}, {}> {
     constructor(props: any) {
          super(props);
     }

     render() {
          return (
               <StuffyForm isAdd={true} />
          );
     }
}