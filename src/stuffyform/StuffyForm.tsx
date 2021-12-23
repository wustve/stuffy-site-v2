import React, { Component } from "react";
import OwnerInput from "./OwnerInput"
import FormInput from "./FormInput"
import FormTextArea from "./FormTextArea"
import DeleteButton from "./DeleteButton"
import {ArticleData} from "../../interfaces/ArticleData";
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'
import '../header/Header.scss';

export default class StuffyForm extends Component<{isAdd: boolean, articleData: ArticleData, exit : any}> {

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
                              <FormInput inputName = "name" inputVal = {this.props.articleData.name} required = {true}/>
                         </label>
                         <label className= 'required'>
                              Image Link
                              <FormInput inputName = "image" inputVal = {this.props.articleData.image} required = {true}/>
                         </label>
                         <label className= 'required'>
                              Owner
                              <OwnerInput isAdd={this.props.isAdd} value = {this.props.articleData.owner}/>
                         </label>
                         <label className= 'required'>
                              Animal Type
                              <input type = "text" id = "animalType-input" name = "animalType" required/>
                         </label>
                         <label>
                              Name Origin 
                              <FormTextArea inputName = "nameOrigin" inputVal = {this.props.articleData.name_origin} required = {false}/>
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
                         <button type = "button" onClick = {this.props.exit}>Cancel</button>
                    </form>
                    <p id = "form-disclaimer"><span style = {{color: "red"}}>*</span> indicates a required field</p>
               </div>
          );
     }
}