import React, { Component } from "react";
import OwnerInput from "./OwnerInput"
import DeleteButton from "./DeleteButton"
import CancelButton from "./CancelButton"
import {ArticleData} from "../../interfaces/ArticleData";
import {Route, NavLink, useRouteMatch} from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import {LocalStorageKey} from "../enums/LocalStorageKey";
import {ColourMode} from '../enums/ColourMode'
import '../header/Header.scss';

export default class StuffyForm extends Component<{path : string, isAdd: boolean, exitSuccess? : any, exit? : any, articleData?: ArticleData}, any> {

     constructor(props: any) {
          super(props);
          this.state = {
               name : (typeof props.articleData !== 'undefined') ? props.articleData.name : "",
               image : (typeof props.articleData !== 'undefined') ? props.articleData.image : "",
               owner : (typeof props.articleData !== 'undefined') ? props.articleData.owner : "", 
               animalType : (typeof props.articleData !== 'undefined') ? props.articleData.animal_type : "", 
               nameOrigin : (typeof props.articleData !== 'undefined') ? props.articleData.name_origin : "", 
               origin : (typeof props.articleData !== 'undefined') ? props.articleData.origin : "", 
               otherNotes : (typeof props.articleData !== 'undefined') ? props.articleData.other_notes : "",
               status : ""
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
     }

     generateInputProps(inputName : string, inputVal? : string) {
          var props = {type : "text", id : inputName + "-input", name : inputName, onChange : this.handleChange};
          var value = (inputVal !== "") ? {value : inputVal} : {};
          return {...props, ...value};
     }

     generateTextAreaProps(inputName : string) {
          return {id : inputName + "-input", name : inputName, onChange : this.handleChange};
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
          console.log("body " + JSON.stringify({
               name : this.state.name,
               image : this.state.image,
               owner : this.state.owner, 
               animalType : this.state.animalType, 
               nameOrigin : this.state.nameOrigin,
               origin : this.state.origin,
               otherNotes : this.state.otherNotes,
         }));
          fetch(this.props.path, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
               },
               body: JSON.stringify({
                    name : this.state.name,
                    image : this.state.image,
                    owner : this.state.owner, 
                    animalType : this.state.animalType, 
                    nameOrigin : this.state.nameOrigin,
                    origin : this.state.origin,
                    otherNotes : this.state.otherNotes,
              })
          }).then((res : any) => res.json())
          .then((res : any) => {
              console.log(res.msg);
              this.setState({status : res.msg});
              if (res === 'Success') {
                   console.log("success");
              }
         })
         event.preventDefault();
     }

     render() {
          return (
               <div id = "form">
                    <form autoComplete = "off" onSubmit={this.handleSubmit}>
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
                              <input {...this.generateInputProps("animalType", this.state.animalType)} required/>
                         </label>
                         <label>
                              Name Origin 
                              <textarea {...this.generateTextAreaProps("nameOrigin")}>{this.state.nameOrigin}</textarea>
                         </label>
                         <label>
                              Origin
                              <textarea {...this.generateTextAreaProps("origin")}>{this.state.origin}</textarea>
                         </label>
                         <label>
                              Other Notes
                              <textarea {...this.generateTextAreaProps("otherNotes")}>{this.state.otherNotes}</textarea>
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