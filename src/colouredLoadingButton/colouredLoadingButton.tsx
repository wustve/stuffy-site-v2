import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";

export default styled((props: LoadingButtonProps) => (
    <LoadingButton {...props}/>
))({
    alignSelf: "flex-start",
    marginBottom: "1%",
    color: "var(--text-colour)",
    borderColor: "var(--border-colour)"
})