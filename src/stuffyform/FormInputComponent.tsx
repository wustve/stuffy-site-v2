import React, { Component } from "react";

export default class FormInputComponent extends Component<{inputName : string, inputVal : string, required : boolean}, {id : string, name : string, value : string, required : boolean}>{

     constructor(props : any) {
          super(props);
          this.state = {
               id : props.inputName + "-input",
               name : props.inputName,
               value : (props.inputVal === "") ? null : props.inputVal,
               required : props.required
          }
     }

     generateProps() {
          return {id : this.state.id, name : this.state.name};
     }
}