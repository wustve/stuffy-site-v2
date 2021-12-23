export default function OwnerInput(props: {isAdd : boolean, value : string}) {
     if (props.isAdd) {
          return (
               <input type = "text" id = "owner-input" name = "owner" required/>
          );
     } else {
          return (
               <input type = "text" id = "owner-input" name = "owner" value = {props.value} disabled/>
          );
     }
}