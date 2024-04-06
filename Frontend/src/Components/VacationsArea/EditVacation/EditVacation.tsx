import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/vacation-model";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import HelperFunctions from "../../HelperFunctionsArea/Helperfunctions";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        vacationsService.getOneVacation(+params.id)
            .then(vacation => {
                setValue("destination", vacation.destination); // Initial value
                setValue("description", vacation.description); // Initial value
                
                const vacation_start_date=HelperFunctions.getFormattedIsraeliDate(vacation.start_date);
                setValue("start_date", vacation_start_date); // Initial value

                const vacation_end_date=HelperFunctions.getFormattedIsraeliDate(vacation.end_date);
                setValue("end_date", vacation_end_date); // Initial value
                
                setValue("price", vacation.price); // Initial value                
                setImageUrl(vacation.imageUrl); // Initial value
                debugger;
            })
            .catch(err => notify.error(err));
    }, []);
    

    async function send(vacation: VacationModel) {
        try {
            
            // Extract first image from FileList into vacation.image:
            vacation.image = (vacation.image as unknown as FileList)[0];
           

             // Send vacation to backend:
             await vacationsService.updateVacation(vacation);
             
             notify.success("Vacation " + vacation.destination+" has been updated.");
             navigate("/vacations");

            // Send vacation to backend:
            await vacationsService.updateVacation(vacation);

            notify.success("vacation has been updated.");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation">
			<h2>Edit a Vacation</h2>
            <form onSubmit={handleSubmit(send)}>
                <div className="form-group">
                    
                    <label>Destination:</label>
                    <input type="text" {...register("destination")}  name="destination"  />
                       
                    <label>Description:</label>
                    <input type="text" {...register("description")}  name="description"  />

                    <label>Start date:</label>
                    <input type="date" {...register("start_date")}  name="start_date"  />

                    <label>End date:</label>
                    <input type="date" {...register("end_date")}  name="end_date"  />

                    <label>Price:</label>
                    <input type="number" {...register("price")}  name="price"  />
                    
                </div>                
                
                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" id="image" name="image" {...register("image")}   />
                </div>
                <button>Update Vacation</button>
            </form>

        </div>
    );
}

export default EditVacation;
