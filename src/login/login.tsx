import { createTheme, styled, TextField, TextFieldProps, ThemeProvider } from "@mui/material";
import { Component, } from "react";
import "./login.scss";

const ColouredTextField = styled((props: TextFieldProps) => (
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
      
    
})

export default class Login extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            status: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const name: string = event.target.name;
        const value: string = event.target.value;

        this.setState({
            [name]: value,
        });

    }

    handleSubmit(event: any) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then(res => res.text())
            .then(res => {
                this.setState({ status: res });
                if (res === 'Success') {
                    this.props.updateLogin(true);
                    this.props.history.push('/');
                    
                }
            })
        event.preventDefault();
    }

    render() {
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <ColouredTextField type='text' label = "Username" name='username' required={true} onChange={this.handleChange} variant = "filled" fullWidth></ColouredTextField>

                <ColouredTextField type='password' label = "Password" name='password' required={true} onChange={this.handleChange}  variant = "filled" fullWidth></ColouredTextField>
                <div id='status'>{this.state.status}</div>
                <input type='submit' value='Login'></input>
            </form>
        )
    }
}