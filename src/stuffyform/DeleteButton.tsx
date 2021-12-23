export default function DeleteButton(props: {isAdd:boolean}) {
     if (props.isAdd) {
          return null;
     } else {
          return (
               <button type = "button" id = 'deleteStuffy'>Delete</button>
          );
     }
}