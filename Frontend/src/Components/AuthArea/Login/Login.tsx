import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { appStore } from "../../../Redux/Store";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import "./Login.css";
import useTitle from "../../../Utils/UseTitle";

// Login component

function Login(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CredentialsModel>({
        mode: "onTouched",
    });
    const navigate = useNavigate();
    useTitle("Vacations | Login");

    async function send(credentials: CredentialsModel) {
        try {
            const tempResponse = await authService.login(credentials);
            const firstName = appStore.getState().user.firstName;

            notify.success(`Welcome back ${firstName}!`);
            navigate("/home");
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                notify.error("Invalid credentials. Please try again.");
            } else {
                notify.error("An error occurred. Please try again later.");
            }
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <h5>Login</h5>
                <label>Email:</label>
                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <p className="error-message">{errors.email.message}</p>
                )}

                <label>Password:</label>
                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password must have at least 4 characters",
                        },
                    })}
                />
                {errors.password && (
                    <p className="error-message">{errors.password.message}</p>
                )}

                <button type="submit" disabled={!isValid}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;