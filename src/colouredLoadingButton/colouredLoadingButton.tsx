import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";

export default styled((props: LoadingButtonProps) => (
    <LoadingButton {...props}/>
))({
    display: "block",
    color: "var(--text-colour)",
    borderColor: "var(--border-colour)"
})