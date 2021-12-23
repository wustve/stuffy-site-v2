import FormInputComponent from "./FormInputComponent"

export default class FormInput extends FormInputComponent {
     render() {
          if (this.state.required) {
               return <textarea {...this.generateProps()} required>{this.state.value}</textarea>;
          } else {
               return <textarea {...this.generateProps()}>{this.state.value}</textarea>;
          }
     }
}