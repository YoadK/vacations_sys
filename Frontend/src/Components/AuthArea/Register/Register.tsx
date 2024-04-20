import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import "./Register.css";
import { notify } from "../../../Utils/Notify";
import useTitle from "../../../Utils/UseTitle";

function Register(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserModel>({
    mode: "onTouched", // Change this line to use "onTouched" mode
  });
  const navigate = useNavigate();
  useTitle("Vacations | Register");

  async function send(user: UserModel) {
    try {
      await authService.register(user);
      const fullName = user.firstName + " " + user.lastName;
      notify.success("Welcome " + fullName);
      navigate("/vacations");
    } catch (err: any) {
      if (err.response && err.response.data) {
        notify.error(err.response.data);
      } else {
        notify.error("Registration failed. Please try again later.");
      }
    }
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit(send)}>
        <h5>Register</h5>
        <label>First name:</label>
        <input
          type="text"
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[\p{L} '-]+$/u,
              message: "Invalid first name",
            },
          })}
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName.message}</p>
        )}

        <label>Last name:</label>
        <input
          type="text"
          {...register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[\p{L} '-]+$/u,
              message: "Invalid last name",
            },
          })}
        />
        {errors.lastName && (
          <p className="error-message">{errors.lastName.message}</p>
        )}

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
              message: "Password must be at least 4 characters long",
            },
            pattern: {
              value: /^[A-Za-z\d]{4,}$/,
              message: "Invalid password pattern",
            },
          })}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        <button type="submit" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;