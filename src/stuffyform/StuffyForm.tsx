import React, { Component } from "react";
import OwnerInput from "./OwnerInput"
import DeleteButton from "./DeleteButton"
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'
import './Header.scss';

export default class StuffyForm extends Component<{isAdd: boolean}, {}> {

     constructor(props: any) {
          super(props);
     }

     cancelEdit() {
          //TODO: write this function that sends user to article page or homepage
     }

     render() {
          return (
               <div id = "form">
                    <form autoComplete = "off">
                         <label className= 'required'>
                              Name
                              <input type = "text" id = "name-input" name = "name" required/>
                         </label>
                         <label className= 'required'>
                              Image Link
                              <input type = "text" id = "image-input" name = "image" required/>
                         </label>
                         <label className= 'required'>
                              Owner
                              <OwnerInput isAdd={this.props.isAdd}/>
                         </label>
                         <label className= 'required'>
                              Animal Type
                              <input type = "text" id = "animalType-input" name = "animalType" required/>
                         </label>
                         <label>
                              Name Origin
                              <textarea id = "nameOrigin-input" name = "nameOrigin"></textarea>
                         </label>
                         <label>
                              Origin
                              <textarea id = "origin-input" name = "origin"></textarea>
                         </label>
                         <label>
                              Other Notes
                              <textarea id = "otherNotes-input" name = "otherNotes"></textarea>
                         </label>
                         <div id = 'status'></div>
                         <input type = "submit" value = "Submit" id = "submit"/>
                         <DeleteButton isAdd={this.props.isAdd}/>
                         <button type = "button" onClick = {this.cancelEdit}>Cancel</button>
                    </form>
                    <p id = "form-disclaimer"><span style = {{color: "red"}}>*</span> indicates a required field</p>
               </div>
          );
     }
}