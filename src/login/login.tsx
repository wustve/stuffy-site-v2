import { Component, } from "react";
import "./login.scss";

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
                Username: <input type='text' name='username' required={true} onChange={this.handleChange}></input>

                Password: <input type='password' name='password' required={true} onChange={this.handleChange}></input>
                <div id='status'>{this.state.status}</div>
                <input type='submit' value='Login'></input>
            </form>
        )
    }
}