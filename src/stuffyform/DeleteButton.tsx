import ColouredLoadingButton from "../colouredLoadingButton/colouredLoadingButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function DeleteButton(props: {isAdd:boolean, loading:boolean, onClick:any}) {
     if (props.isAdd) {
          return null;
     } else {
          return (
               <ColouredLoadingButton loading={props.loading} variant= "outlined" loadingPosition="start" startIcon={<DeleteForeverIcon />} onClick = {props.onClick}>Delete</ColouredLoadingButton>
          );
     }
}