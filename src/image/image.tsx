import { Component } from "react";
import Dialog from "@mui/material/Dialog"

export default class Image extends Component <{src: string}, {isOpen: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    handleClick = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div>
                <img  src = {this.props.src} onClick={this.handleClick}></img>
                <Dialog style = {{position: 'absolute'}} open = {this.state.isOpen} onClose={this.handleClick}>
                    <img src = {this.props.src} onClick={this.handleClick}></img>
                </Dialog>
            </div>
        )
    }
}