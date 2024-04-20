
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/vacation-model";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import HelperFunctions from "../../HelperFunctionsArea/Helperfunctions";
import useTitle from "../../../Utils/UseTitle";


function EditVacation(): JSX.Element {
    const { register, handleSubmit, setValue, setError, clearErrors, watch, formState: { errors } } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const [imageUrl, setImageUrl] = useState<string>();
    const [vacation, setVacation] = useState<VacationModel | null>(null);

    useTitle("Vacations  | Edit Vacation ");

    useEffect(() => {
        const storedVacation = sessionStorage.getItem(`editVacation_${params.id}`);

        if (storedVacation) {
            const parsedVacation = JSON.parse(storedVacation);
            const storedTimestamp = parsedVacation.timestamp;
            const currentTimestamp = Date.now();
            const staleThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds

            if (currentTimestamp - storedTimestamp > staleThreshold) {

                // Stored data is stale, remove it from session storage and fetch fresh data
                sessionStorage.removeItem(`editVacation_${params.id}`);
                fetchVacationData();
            } else {
                // Stored data is still fresh, use it to populate the form fields

                populateFormFields(parsedVacation.data);
            }
        } else {
            // No stored data found, fetch fresh data from the API
            fetchVacationData();
        }
    }, [params.id]);

    const fetchVacationData = () => {
        vacationsService.getOneVacation(+params.id)
            .then(vacation => {
                const currentTimestamp = Date.now();
                const data = {
                    timestamp: currentTimestamp,
                    data: vacation
                };

                sessionStorage.setItem(`editVacation_${params.id}`, JSON.stringify(data));
                populateFormFields(vacation);
            })
            .catch(err => notify.error(err));
    };

    const populateFormFields = (vacation: VacationModel) => {
        setValue("destination", vacation.destination);
        setValue("description", vacation.description);
        setValue("start_date", HelperFunctions.formatDateToYMD(vacation.start_date));
        setValue("end_date", HelperFunctions.formatDateToYMD(vacation.end_date));
        setValue("price", vacation.price);
        setImageUrl(vacation.imageUrl);
        setVacation(vacation);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function send(vacation: VacationModel) {
        try {
            // Set the id:
            vacation.id = +params.id;

            // Extract first image from FileList into vacation.image:
            vacation.image = (vacation.image as unknown as FileList)[0];

            const startDate = watch("start_date");
            const endDate = watch("end_date");
            const areDatesValid = startDate && endDate && HelperFunctions.isDate1BeforeDate2(startDate, endDate);

            // Validate dates:
            if (!areDatesValid) {
                setError("start_date", { type: "manual", message: "Start date must be before end date." });
                setError("end_date", { type: "manual", message: "End date must be after start date." });
                return;
            } else {
                clearErrors(["start_date", "end_date"]);
            }

            // Send vacation to backend:
            await vacationsService.updateVacation(vacation);

            // Fetch the latest vacation data from the backend
            const updatedVacation = await vacationsService.getOneVacation(+params.id);
            

            // Update the session storage with the latest vacation data
            if (updatedVacation) {
                const currentTimestamp = Date.now();
                const data = {
                    timestamp: currentTimestamp,
                    data: {
                        ...updatedVacation,
                        start_date: HelperFunctions.formatDateToYMD(updatedVacation.start_date),
                        end_date: HelperFunctions.formatDateToYMD(updatedVacation.end_date)
                    }
                };
                sessionStorage.setItem(`editVacation_${params.id}`, JSON.stringify(data));
                notify.success("Vacation " + vacation.destination + " has been updated.");
                navigate("/vacations");
            } else {
                console.error("Failed to fetch updated vacation data from the backend.");
                notify.error("An error occurred while updating the vacation.");
            }
        }
        catch (err: any) {
            console.error("Error updating vacation:", err); // Debugging statement
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
                    {errors.start_date && <span className="error-message">{errors.start_date.message}</span>}

                    <label>End date:</label>
                    <input type="date" {...register("end_date")} name="end_date" />
                    {errors.end_date && <span className="error-message">{errors.end_date.message}</span>}

                    <label>Price:</label>
                    <input type="number" {...register("price")} name="price" />
                </div>

                <div className="upload-image">
                    <label htmlFor="image">Upload Image:</label>
                    <input type="file" className="file-input-edit-vacation" id="image" name="image" {...register("image")} onChange={handleImageChange} />
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