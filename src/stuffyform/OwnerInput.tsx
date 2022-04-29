import ColouredTextField from "../colouredTextField/colouredTextField"
export default function OwnerInput(props: {isAdd : boolean, value : string, onChangeFunc : any}) {
     if (props.isAdd) {
          return (
               <ColouredTextField label="Owner" variant="filled" id = "owner-input" name = "owner" onChange = {props.onChangeFunc} required/>
          );
     } else {
          return (
               <ColouredTextField label="Owner" variant="filled" id = "owner-input" name = "owner" value = {props.value} disabled required/>
          );
     }
}