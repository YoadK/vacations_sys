import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/vacation-model";
import { vacationsService } from "../../../Services/VacationsService";
import "./AddVacation.css";
import { notify } from "../../../Utils/Notify";
import UserModel from "../../../Models/UserModel";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import LoginIsNeeded from "../../SharedArea/LoginIsNeeded/LoginIsNeeded";




function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate();

    // Assuming you have a function to check if the user is an admin
    const isAdmin = user?.role === ('admin' || 'Admin');


    async function send(vacation: VacationModel) {
        try {

            // Extract first image from FileList into vacation.image:
            vacation.image = (vacation.image as unknown as FileList)[0];


            // Send vacation to backend:
            await vacationsService.addVacation(vacation);

            notify.success("Vacation " + vacation.destination + " has been added.");
            navigate("/vacations");

            // Send vacation to backend:
            await vacationsService.addVacation(vacation);

            notify.success("vacation has been added.");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">

            <h1>Add Vacation</h1>
            {isAdmin && (
                <div>
                    {/* Admin-only elements go here */}
                    <form onSubmit={handleSubmit(send)}>
                        <div className="form-group">

                            <label>Destination:</label>
                            <input type="text" {...register("destination")} name="destination" required />

                            <label>Description:</label>
                            <input type="text" {...register("description")} name="description" required />

                            <label>Start date:</label>
                            <input type="date" {...register("start_date")} name="start_date" required />

                            <label>End date:</label>
                            <input type="date" {...register("end_date")} name="end_date" required />

                            <label>Price:</label>
                            <input type="number" {...register("price")} name="price" required />


                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Upload Image:</label>
                            <input type="file" id="image" name="image" {...register("image")} required />
                        </div>
                        <button>Add Vacation</button>
                    </form>
                </div>
            )}
            {!isAdmin && (
                   <LoginIsNeeded/>
            )}

        </div>
    );

}

export default AddVacation;
