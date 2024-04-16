import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authService } from "../../../Services/AuthService";
import "./Register.css";
import { notify } from "../../../Utils/Notify";
import useTitle from "../../../Utils/UseTitle";



function Register(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();
    useTitle("Vacations | Register");

  

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            const fullName = user.firstName + " " + user.lastName;
            notify.success("Welcome " + fullName);
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    
    
      
    
    return (
        <div className="Register">


            <form  onSubmit={handleSubmit(send)}>
                <h5>Register</h5>
                <label>First name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last name:</label>
                <input type="text" {...register("lastName")} />

                <label>Email:</label>                
                <input 
                    type="email" 
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })} 
                />
                {errors.email?.type === "required" && <p>{errors.email.message}</p>}
                {errors.email?.type === "pattern" && <p>{errors.email.message}</p>}
                


                <label>Password:</label>
                <input type="password" {...register("password")}  />

                <button>Register</button>

            </form>

            {/* <form onSubmit={handleSubmit(send)}>
                <h5>Registration form</h5>
                <TextField label="First Name" type="text" className="text-box" {...register("firstName")} size="medium" margin="normal" />
                <TextField label="Last Name" type="text" className="text-box" {...register("lastName")} size="medium" margin="normal" />
                <TextField label="Email" type="email" className="text-box" {...register("email")} size="medium" margin="normal" />
                <TextField label="Password" type="password" className="text-box" {...register("password")} size="medium" margin="normal" />
                <ButtonGroup fullWidth variant="contained">
                    <Button color="primary">Register</Button>
                    <Button color="secondary" type="reset">Clear</Button>
                </ButtonGroup>


            </form>
            <FormLabel>Already have an account? <a href="/login">Login</a></FormLabel> */}

        </div>
    );
}

export default Register;
