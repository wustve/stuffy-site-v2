export default function OwnerInput(props: {isAdd : boolean, value : string, onChangeFunc : any}) {
     if (props.isAdd) {
          return (
               <input type = "text" id = "owner-input" name = "owner" onChange = {props.onChangeFunc} required/>
          );
     } else {
          return (
               <input type = "text" id = "owner-input" name = "owner" value = {props.value} style={{cursor: "not-allowed"}} disabled/>
          );
     }
}