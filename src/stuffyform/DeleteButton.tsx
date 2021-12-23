export default function DeleteButton(props: {isAdd:boolean, onClick:any}) {
     if (props.isAdd) {
          return null;
     } else {
          return (
               <button type = "button" id = 'deleteStuffy' onClick = {props.onClick}>Delete</button>
          );
     }
}