import { styled, TextField, TextFieldProps } from "@mui/material";

export default styled((props: TextFieldProps) => (
    <TextField {...props}/>
))({
    display: "block",
    "& label" : {
        color: "var(--text-colour)",
    },
    '& .MuiFilledInput-root': {
        color: "var(--text-colour)",
        backgroundColor: "var(--main-bg-colour)",
    },
    '& .MuiFilledInput-underline': {
        '&:before, &&:hover:before' : {
            borderBottomColor: 'var(--border-colour) !important',
        },
      },
    "& .Mui-disabled" : {
        WebkitTextFillColor: "var(--text-colour) !important",
        color: "var(--text-colour) !important",

    },
    
})