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
import HelperFunctions from "../../HelperFunctionsArea/Helperfunctions";
import useTitle from "../../../Utils/UseTitle";





function AddVacation(): JSX.Element {
    const { register, handleSubmit, setError,clearErrors , watch } = useForm<VacationModel>();
    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate();
    const isAdmin = (user?.role.toLowerCase() === 'admin');
    const startDate = watch("start_date");
    const endDate = watch("end_date");
    const isDateValid = startDate && endDate && new Date(startDate) < new Date(endDate);
    useTitle("Vacations  | Add Vacation");


    async function send(vacation: VacationModel) {
        try {
            // Extract first image from FileList into vacation.image:
            vacation.image = (vacation.image as unknown as FileList)[0];

            // Validate dates:
            if (!HelperFunctions.isDate1BeforeDate2(vacation.start_date, vacation.end_date)) {
                setError("start_date", { type: "manual", message: "Start date must be before end date." });
                setError("end_date", { type: "manual", message: "End date must be after start date." });
                return;
            }    
            else { clearErrors(["start_date", "end_date"]);                
            }        

            // Send vacation to backend:
            await vacationsService.addVacation(vacation);

            notify.success("Vacation " + vacation.destination + " has been added.");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">


            {isAdmin && (
                <div>
                    {/* Admin-only elements go here */}
                    <h1>Add Vacation</h1>
                    <form onSubmit={handleSubmit(send)}>
                        <div className="form-group">

                            <label>Destination:</label>
                            <input type="text" {...register("destination")} name="destination" required />

                            <label>Description:</label>
                            <input type="text" {...register("description")} name="description" required />

                            <label>Start date:</label>
                            <input type="date" {...register("start_date", { required: true })} name="start_date" />
                            {startDate && endDate && !isDateValid && <span className="error-message">Start date must be before end date.</span>}

                            <label>End date:</label>
                            <input type="date" {...register("end_date", { required: true })} name="end_date" />
                            {startDate && endDate && !isDateValid && <span className="error-message">End date must be after start date.</span>}



                            <label>Price:</label>
                            <input type="number" {...register("price")} name="price" required />


                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Upload Image:</label>
                            <input type="file" className="file-input-add-vacation" id="image" name="image"  {...register("image")} required />
                        </div>
                        <button>Add Vacation</button>
                        <button className="cancel-button-add-vacation" type="button" onClick={() => navigate("/vacations")}>Cancel</button>
                    </form>
                </div>
            )}
            {!isAdmin && (
                <LoginIsNeeded />
            )}

        </div>
    );

}

export default AddVacation;
