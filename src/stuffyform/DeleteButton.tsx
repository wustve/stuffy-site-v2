export default function DeleteButton(props: {isAdd:boolean}) {
     if (props.isAdd) {
          return;
     } else {
          return (
               <button type = "button" id = 'deleteStuffy'>Delete</button>
          );
     }
}