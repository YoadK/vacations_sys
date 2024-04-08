import React from "react";
import { Link } from "react-router-dom";
import "./MyMenu.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { useSelector } from "react-redux";
import homeIcon from "../../../../src/Assets/icons/home.png";
import vacationIcon from "../../../../src/Assets/icons/vacations.png";
import reportsIcon from "../../../../src/Assets/icons/icons8-bar-chart-94.png";
import csvIcon from "../../../Assets/icons/icons8-csv-25.png";
import aboutIcon from "../../../Assets/icons/about.png";
import contactIcon from "../../../Assets/icons/contact.png";

function MyMenu(): JSX.Element {

    const user = useSelector<AppState, UserModel | null>(state => state.user);
    const userId = user ? user.id : null;

    return (
        <div id="myMenu-container">

            <nav role="navigation" className="myMenu-navigation">
                <ul>
                    <li><Link to="/home">Home <img className= "home-icon" src={homeIcon} /></Link></li>
                    <li><a href="#">Vacation Area <img className= "vacation-icon" src={vacationIcon} /></a>
                        <ul className="dropdown">
                            <li><Link to="/vacations">Vacations</Link></li>
                            <li><Link to="/vacations/new">Add a vacation</Link></li>
                            
                        </ul>
                    </li>
                    <li><a href="#">Reports Area <img className= "reports-icon" src={reportsIcon} /></a>
                        <ul className="dropdown">
                            <li><Link to="/viewReports">View reports</Link></li>                        
                            
                        </ul>
                    </li>

                    <li><a href="#">CSV Area <img className= "csv-reports-icon" src={csvIcon} /></a>
                        <ul className="dropdown">
                            <li><Link to="/create-csv-file">Create CSV report file</Link></li>                        
                            
                        </ul>
                    </li>

                    <li><a href="#">About  <img className= "about-icon" src={aboutIcon} /></a></li>
                    <li><a href="#">Contact  <img className= "contact-icon" src={contactIcon} /></a></li>
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
