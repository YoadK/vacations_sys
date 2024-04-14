import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";

// Login component

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            
            const tempResponse =await authService.login(credentials);
            const firstName = appStore.getState().user.firstName;
            console.log("Login response:", tempResponse);
            
            notify.success(`Welcome back ${firstName}!`);
            navigate("/home");
        }
        catch (err: any) {
            console.error("Login error:", err);
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>
                <h5>Login</h5>
                <label>Email:</label>
                <input type="email" {...register("email")}  required  />

                <label>Password:</label>
                <input type="password" {...register("password")} required min={4}  />

                <button>Login</button>
            </form>










        </div>
    );
}

export default Login;
