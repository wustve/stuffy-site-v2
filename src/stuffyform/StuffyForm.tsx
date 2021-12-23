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

export default class StuffyForm extends Component<{isAdd: boolean, exit? : any, articleData?: ArticleData}, any> {

     constructor(props: any) {
          super(props);
          this.state = {
               name : (typeof props.articleData !== 'undefined') ? props.articleData.name : "",
               image : (typeof props.articleData !== 'undefined') ? props.articleData.image : "",
               owner : (typeof props.articleData !== 'undefined') ? props.articleData.owner : "", 
               animal_type : (typeof props.articleData !== 'undefined') ? props.articleData.animal_type : "", 
               name_origin : (typeof props.articleData !== 'undefined') ? props.articleData.name_origin : "", 
               origin : (typeof props.articleData !== 'undefined') ? props.articleData.origin : "", 
               other_notes : (typeof props.articleData !== 'undefined') ? props.articleData.string : "",
               status : ""
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
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

     handleChange(event : any) {
          const name: string = event.target.name;
          const value: string = event.target.value;

          this.setState({
               [name]: value,
          });
     }

     handleSubmit(event : any) {
          fetch(location.href, {
               method: 'POST',
               body: JSON.stringify({
                    name : this.state.name,
                    image : this.state.image,
                    owner : this.state.owner, 
                    animal_type : this.state.animal_type, 
                    name_origin : this.state.name_origin,
                    origin : this.state.origin,
                    other_notes : this.state.other_notes
              })
         }).then(res => res.text())
         .then(res => {
              this.setState({status : res});
         })
         event.preventDefault();
     }

     render() {
          return (
               <div id = "form">
                    <form autoComplete = "off">
                         <label className= 'required'>
                              Name
                              <input {...this.generateInputProps("name", this.state.name)} required/>
                         </label>
                         <label className= 'required'>
                              Image Link
                              <input {...this.generateInputProps("image", this.state.image)} required/>
                         </label>
                         <label className= 'required'>
                              Owner
                              <OwnerInput isAdd={this.props.isAdd} value = {this.props.articleData.owner}/>
                         </label>
                         <label className= 'required'>
                              Animal Type
                              <input {...this.generateInputProps("animal_type", this.state.animal_type)} required/>
                         </label>
                         <label>
                              Name Origin 
                              <textarea {...this.generateTextAreaProps("name_origin")}>{this.state.name_origin}</textarea>
                         </label>
                         <label>
                              Origin
                              <textarea {...this.generateTextAreaProps("origin")}>{this.state.origin}</textarea>
                         </label>
                         <label>
                              Other Notes
                              <textarea {...this.generateTextAreaProps("other_notes")}>{this.state.other_notes}</textarea>
                         </label>
                         <div id = 'status'><p>{this.state.status}</p></div>
                         <input type = "submit" value = "Submit" id = "submit"/>
                         <DeleteButton isAdd={this.props.isAdd}/>
                         <CancelButton {...this.generateCancelButtonProps()}/>
                    </form>
                    <p id = "form-disclaimer"><span style = {{color: "red"}}>*</span> indicates a required field</p>
               </div>
          );
     }
}