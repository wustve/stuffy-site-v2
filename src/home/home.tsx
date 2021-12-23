import { Component } from "react";
import './home.scss'
import Image from "../image/image";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";

export default class Home extends Component<{stevenStuffy: StuffyMenuData, monicaStuffy: StuffyMenuData}, {}> {
    render() {
        return (
            <div id = "homepage">
                <h1>Stuffy Site</h1>
                <div id = "stuffyOfTheDayWrapper">
                    <div className = "stuffyOfTheDay">
                        <h2>Steven's Stuffy of the Day!</h2>
                        <h3>{this.props.stevenStuffy.name}</h3>
                        <div className = "stuffyOfTheDayPic">
                            <Image src = {this.props.stevenStuffy.image}></Image>
                        </div>
                        
                    </div>
                    <div className = "stuffyOfTheDay">
                        <h2>Monica's Stuffy of the Day!</h2>
                        <h3>{this.props.monicaStuffy.name}</h3>
                        <div className = "stuffyOfTheDayPic">
                            <Image src = {this.props.monicaStuffy.image}></Image>
                        </div>
                        
                    </div>
                </div>
            </div>
            )
    }
}