import React, {Component} from 'react'
import { MenuItems} from "./Menuitems"
import { Link } from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component{
    state = { clicked: false}

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <Link to="/" className="navbar-logo"><h1><i className="fa fa-university" aria-hidden="true"></i>iRent</h1></Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item,index) =>{
                        /*
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                        */
                       return( 
                           <Link to={item.url} className={item.cName} key={index}>
                               <li>{item.title}</li>
                           </Link>

                       )
                    })}
                </ul>
            </nav>
        )   
    }
}

export default Navbar