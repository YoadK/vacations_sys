import React, { useState } from "react";
import HelperFunctions from "../../HelperFunctionsArea/Helperfunctions";
import { VacationModel } from "../../../Models/vacation-model";
import "./VacationCard.css";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import locationIcon from "../../../Assets/icons/land-layer-location.png";
import calendarIcon from "../../../Assets/icons/calendar-days.png";
import informationIcon from "../../../Assets/icons/comment-info.png";




type VacationCardProps = {
    vacation: VacationModel;
    onDelete: (id: number) => void; 
    onLikeStatusChange: (updatedVacation: VacationModel) => void; 
};

function VacationCard({ vacation, onDelete, onLikeStatusChange }: VacationCardProps): JSX.Element {
    const [likes, setLikes] = useState<number>(vacation.totalLikesCount);
    const [isLiked, setIsLiked] = useState<boolean>(vacation.isLikedByCurrentUser);
    const [imageErrorCount, setImageErrorCount] = useState<number>(0);
    const navigate = useNavigate();

    const user = useSelector<AppState, UserModel>(state => state.user);



    const userId = user.id;


    const handleLike = async () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);

        try {
            await vacationsService.updateVacationLikesStatusAndCount(vacation.id, userId, newIsLiked);
            const updatedVacation = await vacationsService.getOneVacation(vacation.id);
            setLikes(updatedVacation.totalLikesCount);

            // Pass the updated vacation data back to the parent component
            onLikeStatusChange(updatedVacation);

        } catch (error) {
            console.error("Error updating like count:", error);
            setIsLiked(isLiked); // rollback on an error
        }
    };

    const handleEdit = () => {

        navigate(`/vacations/edit/${vacation.id}`);
    };


    const handleDelete = async () => {
        try {
            // ask the user to confirm...
            const sure = window.confirm("Are you sure?");
            if (!sure) return;

            vacationsService.deleteVacation(vacation.id);


            // Refetch the vacations data
            await vacationsService.getAllVacationsWithLikes(userId);
            notify.success("vacation has been deleted.");

            onDelete(vacation.id); // // This line will trigger the update in the parent component

            navigate("/vacations");
        }
        catch (err: any) {
            // notify.error(err);
            notify.error("Failed to delete vacation: " + err.message);
            console.error("Error deleting vacation:", err);
        }


    };

    const handleImageError = () => setImageErrorCount(count => count + 1);


    return (
        <div className="vacation-card-container">
            <div className="vacation-card">
                <div className="vacation-image">
                    <img
                        src={`${vacation.imageUrl}?errorCount=${imageErrorCount}`}
                        alt={`${vacation.destination} ${vacation.imageUrl}`}
                        onError={handleImageError}
                    />
                    {user && (user.role.toLowerCase() ===  "admin") && (
                        <>

                            <button className="edit-button" onClick={handleEdit} title="Edit vacation" ></button>



                            <button className="delete-button" onClick={handleDelete} title="Delete vacation"></button>
                        </>
                    )}



                </div>
                <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                    Likes: <span className="badge">{likes}</span>
                </button>
                <div className="vacation-details">
                    <h2>
                        <i className="fas fa-map-marker-alt">
                            <img src={locationIcon} alt="Location Icon" />
                        </i>{" "}
                        {vacation.destination}&nbsp;
                    </h2>
                    <div className="duration">
                        <span>
                            <i className="far fa-calendar-alt">
                                <img src={calendarIcon} alt="calendar-days icon" />
                            </i>
                            <p>
                                From: {HelperFunctions.getFormattedIsraeliDate(vacation.start_date)}, &nbsp;
                                To: {HelperFunctions.getFormattedIsraeliDate(vacation.end_date)} &nbsp;{" "}
                            </p>
                        </span>
                    </div>
                    <div className="description">
                        <i className="fas fa-info-circle">
                            <img src={informationIcon} alt="description-alt icon" />
                        </i>
                        <p>{vacation.description}</p>
                    </div>
                    <div className="price">
                        <i className="fas fa-money-bill-wave"></i>
                        <button>Price: {vacation.price}</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default VacationCard;
