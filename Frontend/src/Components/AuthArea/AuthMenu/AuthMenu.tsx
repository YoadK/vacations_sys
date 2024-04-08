import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { authService } from "../../../Services/AuthService";
import "./AuthMenu.css";
import { notify } from "../../../Utils/Notify";
import exitIcon from "../../../../src/Assets/icons/exit.png";
import signinIcon from "../../../../src/Assets/icons/sign-in-alt.png";
import registerIcon from "../../../../src/Assets/icons/notebook.png";

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
                <img src={exitIcon} />&nbsp;&nbsp;
                <NavLink to="/home" onClick={logMeOut}>Logout</NavLink>
            </div>

        );
    }

    return (
        <div className="AuthMenu">
            Hello Guest <br/>
            <img src={signinIcon} />&nbsp;
            <NavLink to="/login">Login | </NavLink>&nbsp;
            <img src={registerIcon} />&nbsp;
            <NavLink to="/register">Register</NavLink>

        </div>
    );
}

export default AuthMenu;
