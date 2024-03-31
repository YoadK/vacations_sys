import React from "react";
import { Link } from "react-router-dom";
import "./MyMenu.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { useSelector } from "react-redux";



function MyMenu(): JSX.Element {

    const user = useSelector<AppState, UserModel | null>(state => state.user);
    const userId = user ? user.id : null;

    return (
        <div id="myMenu-container">

            <nav role="navigation" className="myMenu-navigation">
                <ul>
                    <li><Link to="/home">Home <img className= "home-icon" src="../../../Assets/icons/home.png" /></Link></li>
                    <li><a href="#">Vacation Area <img className= "vacation-icon" src="../../../Assets/icons/vacations.png" /></a>
                        <ul className="dropdown">
                            <li><Link to="/vacations">Vacations</Link></li>
                            <li><Link to="/vacations/new">Add a vacation</Link></li>
                            
                        </ul>
                    </li>
                    <li><a href="#">About  <img className= "about-icon" src="../../../Assets/icons/about.png" /></a></li>
                    <li><a href="#">Contact  <img className= "contact-icon" src="../../../Assets/icons/contact.png" /></a></li>
                    <li><a href="#">User Account 🧑/🧒</a>
                    <ul className="dropdown">
                            {/* <li><Link to="/login">Login </Link></li>
                            <li><Link to="/register">Register </Link></li> */}
                            <li><AuthMenu/></li> 
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MyMenu;
