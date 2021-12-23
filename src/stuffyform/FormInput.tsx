import FormInputComponent from "./FormInputComponent"

export default class FormInput extends FormInputComponent {
     render() {
          var inputProps = this.generateProps();
          var newProps = {type : "text", value : this.state.value};
          inputProps = {...inputProps, ...newProps};
          if (this.state.required) {
               return <input {...inputProps} required/>;
          } else {
               return <input {...inputProps} />;
          }
     }
}