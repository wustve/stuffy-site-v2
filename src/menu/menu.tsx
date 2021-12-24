import { Component } from "react";
import { NavLink } from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import './menu.scss';
import getLink from "../article/helpers/getlink";

export default class Menu extends Component<{ options: Array<StuffyMenuData> }, { display: Array<StuffyMenuData>, query: string }> {
    constructor(props) {
        super(props);
        this.state = { display: this.props.options, query: "" };
    }

    componentWillReceiveProps(nextProps: Readonly<{ options: Array<StuffyMenuData>; }>, nextContext: any): void {
        this.search(this.state.query, nextProps.options);
    }

    filter = ({ target }) => {
        this.setState({query: target.value.toLowerCase()});
        this.search(target.value.toLowerCase(), this.props.options);
    }

    search = (query: string, stuffies: Array<StuffyMenuData>) => {
        if (query === '') {
            this.setState({ display: stuffies });
        } else {
            this.setState({ display: stuffies.filter(stuffy => (stuffy.name + stuffy.animal_type).toLowerCase().includes(query)) });
        }
    }

    render() {
        return (
            <div className='menu'>
                <input type='text' id='searchBar' onKeyUp={this.filter} autoComplete="off" placeholder='Search' title='Enter a stuffy'></input>

                <div id='selection'>
                    <NavLink exact to='/'>Home</NavLink>
                    {this.state.display.map(stuffy => {
                        let label = stuffy.name + ' (' + stuffy.animal_type + ')';
                        return <NavLink to={getLink(stuffy)}>{label}</NavLink>;
                    })}
                </div>
            </div>)
    }
}