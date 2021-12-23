import { Link } from "react-router-dom";

export default function CancelButton(props: {isAdd : boolean, exit? : any}) {
     if (props.isAdd) {
          return (
               <Link to="/">
                    <button type = "button">Cancel</button>
               </Link>
          );
     } else {
          return (
               <button type = "button" onClick = {props.exit}>Cancel</button>
          );
     }
}