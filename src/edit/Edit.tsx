import React, { Component } from "react";
import StuffyForm from "../stuffyform/StuffyForm"
import {Route, NavLink} from "react-router-dom";
//import './Edit.scss';

export default class Edit extends Component<{}, {}> {
     constructor(props: any) {
          super(props);
     }

     render() {
          return (
               <StuffyForm isAdd={false} />
          );
     }
}