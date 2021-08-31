import { Component } from "react";
import './home.scss'

export default class Home extends Component<{stevenStuffy: any, monicaStuffy: any}, {}> {
    render() {
        return (
            <div id = "homepage">
                <h1>Stuffy Site</h1>
                <div id = "stuffyOfTheDayWrapper">
                    <div className = "stuffyOfTheDay">
                        <h2>Steven's Stuffy of the Day!</h2>
                        <h3>{this.props.stevenStuffy.name}</h3>
                        <img className = "stuffyOfTheDayPic" src = {this.props.stevenStuffy.image}></img>
                    </div>
                    <div className = "stuffyOfTheDay">
                        <h2>Monica's Stuffy of the Day!</h2>
                        <h3>{this.props.monicaStuffy.name}</h3>
                        <img className = "stuffyOfTheDayPic" src = {this.props.monicaStuffy.image}></img>
                    </div>
                </div>
            </div>
            )
    }
}