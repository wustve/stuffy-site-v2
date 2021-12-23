import React, { Component } from "react";
import OwnerInput from "./OwnerInput"
import DeleteButton from "./DeleteButton"
import CancelButton from "./CancelButton"
import {ArticleData} from "../../interfaces/ArticleData";
import {Route, NavLink} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'
import '../header/Header.scss';

export default class StuffyForm extends Component<{isAdd: boolean, exit? : any, articleData?: ArticleData}> {

     constructor(props: any) {
          super(props);
     }

     generateInputProps(inputName : string, inputVal? : string) {
          var props = {type : "text", id : inputName + "-input", name : inputName};
          var value = (inputVal !== "") ? {value : inputVal} : {};
          return {...props, ...value};
     }

     generateTextAreaProps(inputName : string) {
          return {id : inputName + "-input", name : inputName};
     }

     generateCancelButtonProps() {
          var props = {isAdd : this.props.isAdd};
          var exitFunc = (typeof this.props.exit !== 'undefined') ? {exit : this.props.exit} : {};
          return {...props, ...exitFunc};
     }

     render() {
          return (
               <div id = "form">
                    <form autoComplete = "off">
                         <label className= 'required'>
                              Name
                              <input {...this.generateInputProps("name", (typeof this.props.articleData !== 'undefined') ? this.props.articleData.name : "")} required/>
                         </label>
                         <label className= 'required'>
                              Image Link
                              <input {...this.generateInputProps("image", (typeof this.props.articleData !== 'undefined') ? this.props.articleData.image : "")} required/>
                         </label>
                         <label className= 'required'>
                              Owner
                              <OwnerInput isAdd={this.props.isAdd} value = {this.props.articleData.owner}/>
                         </label>
                         <label className= 'required'>
                              Animal Type
                              <input {...this.generateInputProps("animalType", (typeof this.props.articleData !== 'undefined') ? this.props.articleData.animal_type : "")} required/>
                         </label>
                         <label>
                              Name Origin 
                              <textarea {...this.generateTextAreaProps("nameOrigin")}>{(typeof this.props.articleData !== 'undefined') ? this.props.articleData.name_origin : ""}</textarea>
                         </label>
                         <label>
                              Origin
                              <textarea {...this.generateTextAreaProps("origin")}>{(typeof this.props.articleData !== 'undefined') ? this.props.articleData.origin : ""}</textarea>
                         </label>
                         <label>
                              Other Notes
                              <textarea {...this.generateTextAreaProps("otherNotes")}>{(typeof this.props.articleData !== 'undefined') ? this.props.articleData.other_notes : ""}</textarea>
                         </label>
                         <div id = 'status'></div>
                         <input type = "submit" value = "Submit" id = "submit"/>
                         <DeleteButton isAdd={this.props.isAdd}/>
                         <CancelButton {...this.generateCancelButtonProps()}/>
                    </form>
                    <p id = "form-disclaimer"><span style = {{color: "red"}}>*</span> indicates a required field</p>
               </div>
          );
     }
}