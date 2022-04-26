import React, { Component } from "react";
import OwnerInput from "./OwnerInput"
import DeleteButton from "./DeleteButton"
import CancelButton from "./CancelButton"
import {ArticleData} from "../../interfaces/ArticleData";
import '../header/Header.scss';

export default class StuffyForm extends Component<{path : string, isAdd: boolean, exitSuccess : any, exit? : any, articleData?: ArticleData}, any> {

     constructor(props: any) {
          super(props);
          this.state = {
               name : props.articleData ? props.articleData.name : "",
               image : props.articleData ? props.articleData.image : "",
               owner : props.articleData ? props.articleData.owner : "", 
               animalType : props.articleData ? props.articleData.animal_type : "", 
               nameOrigin : props.articleData ? props.articleData.name_origin : "", 
               origin : props.articleData ? props.articleData.origin : "", 
               otherNotes : props.articleData ? props.articleData.other_notes : "",
               status : ""
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleDelete = this.handleDelete.bind(this);
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

     afterSubmit(url : string) {
          this.props.exitSuccess(url);
          // get menu to refetch data
     }

     handleChange(event : any) {
          const name: string = event.target.name;
          const value: string = event.target.value;

          this.setState({
               [name]: value,
          });
     }

     handleSubmit(event : any) {
          fetch('/stuffies' + this.props.path, {
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
              this.setState({status : res.msg});
              if (res.msg === 'Success') {
                   this.afterSubmit(res.url);
              }
         })
         event.preventDefault();
     }

     handleDelete(event : any) {
          if (!window.confirm("Are you sure you want to delete " + this.state.name + ' (' + this.state.animalType + ')')) {
               return;
          }
          fetch('/stuffies' + this.props.path, {
               method: 'DELETE'
          })
          .then(res => res.text())
          .then(res => {
               this.setState({status : res});
               if (res === 'Success') {
                    this.afterSubmit('/');
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
                         </label>
                         <input {...this.generateInputProps("name", this.state.name)} required/>
                         <label className= 'required'>
                              Image Link
                         </label>
                         <input {...this.generateInputProps("image", this.state.image)} required/>
                         <label className= 'required'>
                              Owner
                         </label>
                         <OwnerInput isAdd={this.props.isAdd} value = {this.state.owner} onChangeFunc = {this.handleChange}/>
                         <label className= 'required'>
                              Animal Type
                         </label>
                         <input {...this.generateInputProps("animalType", this.state.animalType)} required/>
                         <label>
                              Name Origin 
                         </label>
                         <textarea {...this.generateTextAreaProps("nameOrigin")}>{this.state.nameOrigin}</textarea>
                         <label>
                              Origin
                         </label>
                         <textarea {...this.generateTextAreaProps("origin")}>{this.state.origin}</textarea>
                         <label>
                              Other Notes
                         </label>
                         <textarea {...this.generateTextAreaProps("otherNotes")}>{this.state.otherNotes}</textarea>
                         <div id = 'status'><p>{this.state.status}</p></div>
                         <input type = "submit" value = "Submit" id = "submit"/>
                         <DeleteButton isAdd={this.props.isAdd} onClick={this.handleDelete}/>
                         <CancelButton {...this.generateCancelButtonProps()}/>
                    </form>
                    <p id = "form-disclaimer"><span style = {{color: "red"}}>*</span> indicates a required field</p>
               </div>
          );
     }
}