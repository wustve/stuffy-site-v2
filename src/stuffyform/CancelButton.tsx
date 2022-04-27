import { Link } from "react-router-dom";
import ColouredLoadingButton from "../colouredLoadingButton/colouredLoadingButton";
import CancelIcon from '@mui/icons-material/Cancel';
export default function CancelButton(props: {isAdd : boolean, exit? : any}) {
     if (props.isAdd) {
          return (
               <Link to="/">
                    <ColouredLoadingButton variant= "outlined" loadingPosition="start" startIcon={<CancelIcon />}>Cancel</ColouredLoadingButton>
               </Link>
          );
     } else {
          return (
               <ColouredLoadingButton variant= "outlined" loadingPosition="start" startIcon={<CancelIcon />} onClick = {props.exit}>Cancel</ColouredLoadingButton>
          );
     }
}