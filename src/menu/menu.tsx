import { Component } from "react";
import { NavLink } from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import './menu.scss';

export default class Menu extends Component<{ options: Array<StuffyMenuData> }, { display: Array<StuffyMenuData> }> {
    constructor(props) {
        super(props);
        this.state = { display: this.props.options };
    }

    getLink(stuffy: StuffyMenuData) {
        return ('/' + stuffy.name.split(' ').join('_') + '/' + stuffy.animal_type.split(' ').join('_') + '#active');
    }

    filter = ({ target }) => {

        if (target.value === '') {
            this.setState({ display: this.props.options });
        } else {
            let query = target.value.toLowerCase();
            this.setState({ display: this.props.options.filter(stuffy => (stuffy.name + stuffy.animal_type).toLowerCase().includes(query)) });
            console.log(this.state.display)
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
                        return <NavLink to={this.getLink(stuffy)}>{label}</NavLink>;
                    })}
                </div>
            </div>)
    }
}