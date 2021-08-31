import { Component } from "react";
import { NavLink } from "react-router-dom";
import { StuffyMenuData } from "../../interfaces/StuffyMenuData";
import './menu.scss';

export default class Menu extends Component<{ options: Array<StuffyMenuData> }, { display: Array<StuffyMenuData> }> {
    constructor(props) {
        super(props);
        this.state = { display: this.props.options };
    }

    filter(event: any) {
        if (event.target.value === '') {
            this.setState({display: this.props.options});
        } else {
            let query = event.target.value.toLowerCase();
            this.setState({display: this.props.options.filter(stuffy => (stuffy.name + stuffy.animal_type).toLowerCase().indexOf(query) > -1)})
        }
    }

    render() {
        return (
            <div className='menu'>
                <input type='text' id='searchBar' onKeyUp={this.filter} autoComplete="off" placeholder='Search' title='Enter a stuffy'></input>
                
                <div id='selection'>
                <NavLink to='/'>Home</NavLink>
                    {this.props.options.map(stuffy => {
                        let para = '/' + stuffy.name.split(' ').join('_');
                        para += '/' + stuffy.animal_type.split(' ').join('_');
                        para += '#active';
                        let label = stuffy.name + ' (' + stuffy.animal_type + ')';
                        return <NavLink to={para}>{label}</NavLink>;
                    })}
                </div>
            </div>)
    }
}