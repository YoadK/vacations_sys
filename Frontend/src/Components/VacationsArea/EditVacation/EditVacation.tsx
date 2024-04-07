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

    const [vacation, setVacation] = useState<VacationModel | null>(null);

    useEffect(() => {
        const storedVacation = sessionStorage.getItem("editVacation");
        if (storedVacation) {
            const parsedVacation = JSON.parse(storedVacation);
            const storedTimestamp = parsedVacation.timestamp;
            const currentTimestamp = Date.now();
            const staleThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds

            if (currentTimestamp - storedTimestamp > staleThreshold) {
                // Stored data is stale, remove it from session storage and fetch fresh data
                sessionStorage.removeItem("editVacation");
                fetchVacationData();
            } else {
                // Stored data is still fresh, use it to populate the form fields
                setValue("destination", parsedVacation.data.destination);
                setValue("description", parsedVacation.data.description);
                setValue("start_date", HelperFunctions.formatDateToISO(parsedVacation.data.start_date));
                setValue("end_date", HelperFunctions.formatDateToISO(parsedVacation.data.end_date));
                setValue("price", parsedVacation.data.price);
                setImageUrl(parsedVacation.data.imageUrl);
                setVacation(parsedVacation.data);
            }
        } else {
            // No stored data found, fetch fresh data from the API
            fetchVacationData();
        }
    }, []);

    const fetchVacationData = () => {
        vacationsService.getOneVacation(+params.id)
            .then(vacation => {
                const currentTimestamp = Date.now();
                const data = {
                    timestamp: currentTimestamp,
                    data: vacation
                };
                sessionStorage.setItem("editVacation", JSON.stringify(data));
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("start_date", HelperFunctions.formatDateToISO(vacation.start_date));
                setValue("end_date", HelperFunctions.formatDateToISO(vacation.end_date));
                setValue("price", vacation.price);
                setImageUrl(vacation.imageUrl);
                setVacation(vacation);
            })
            .catch(err => notify.error(err));
    };


    async function send(vacation: VacationModel) {
        try {

            // Set the id:
            vacation.id = +params.id;

            // Extract first image from FileList into vacation.image:
            vacation.image = (vacation.image as unknown as FileList)[0];


            // Send vacation to backend:
            await vacationsService.updateVacation(vacation);

            notify.success("Vacation " + vacation.destination + " has been updated.");
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
                    <input type="text" {...register("destination")} name="destination" />

                    <label>Description:</label>
                    <input type="text" {...register("description")} name="description" />

                    <label>Start date:</label>
                    <input type="date" {...register("start_date")} name="start_date" />

                    <label>End date:</label>
                    <input type="date" {...register("end_date")} name="end_date" />

                    <label>Price:</label>
                    <input type="number" {...register("price")} name="price" />

                </div>

                <div className="upload-image">
                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" className="file-input-edit-vacation" id="image" name="image" {...register("image")} />
                </div>

                <div className="image-preview">
                    <span>Image Preview</span>
                    <img src={imageUrl} className="no-file-chosen" alt="Vacation image Preview" />
                </div>

                <button>Update Vacation</button>
                <button className="cancel-button-edit-vacation" type="button" onClick={() => navigate("/vacations")}>Cancel</button>

            </form>

        </div>
    );
}
export default EditVacation;
