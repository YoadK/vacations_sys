import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { authService } from "../../../Services/AuthService";
import "./AuthMenu.css";
import { notify } from "../../../Utils/Notify";

function AuthMenu(): JSX.Element {

    const user = useSelector<AppState, UserModel>(appState => appState.user);

    function logMeOut(): void {
        notify.success(`Bye bye ${user.firstName}...`);
        authService.logout();
    }

    if (user) {
        return (
            <div className="AuthMenu">
                Hello {user.firstName} {user.lastName}<br/>
                
                <img src="../../../Assets/icons/exit.png" />&nbsp;&nbsp;
                <NavLink to="/home" onClick={logMeOut}>Logout</NavLink>
            </div>



          

        );
    }

    return (
        <div className="AuthMenu">
            Hello Guest <br/>
            <img src="../../../Assets/icons/sign-in-alt.png" />&nbsp;
            <NavLink to="/login">Login | </NavLink>&nbsp;
            <img src="../../../Assets/icons/notebook.png" />&nbsp;
            <NavLink to="/register">Register</NavLink>

        </div>
    );
}

export default AuthMenu;
