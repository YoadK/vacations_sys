import React, { useState } from "react";
import { VacationModel } from "../../../Models/vacation-model";
import "./VacationCard.css";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import HelperFunctions from "../../HelperFunctionsArea/Helperfunctions";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";

type VacationCardProps = {
    vacation: VacationModel;
};

function VacationCard({ vacation }: VacationCardProps): JSX.Element {
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
        } catch (error) {
            console.error("Error updating like count:", error);
            setIsLiked(isLiked); // rollback on an error
        }
    };

    const handleEdit = () => {
        navigate(`/vacations/edit/${vacation.id}`);
    };


    const handleDelete = () => {
        try {
            // ask the user to confirm...
            const sure = window.confirm("Are you sure?");
            if(!sure) return;

            vacationsService.deleteVacation(vacation.id);
            notify.success("vacation has been deleted.");
            navigate("/vacations");
        }
        catch(err: any) {
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
                    <button className="edit-button" onClick={handleEdit}>Edit</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
                <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                    Likes: <span className="badge">{likes}</span>
                </button>
                <div className="vacation-details">
                <h2>
                        <i className="fas fa-map-marker-alt">
                            <img src="../../../Assets/icons/land-layer-location.png" alt="Location Icon" />
                        </i>{" "}
                        {vacation.destination}&nbsp;
                    </h2>
                    <div className="duration">
                    <span>
                            <i className="far fa-calendar-alt">
                                <img src="../../../Assets/icons/calendar-days.png" alt="calendar-days icon" />
                            </i>
                            <p>
                                From: {HelperFunctions.getFormattedIsraeliDate(vacation.start_date)}, &nbsp;
                                To: {HelperFunctions.getFormattedIsraeliDate(vacation.end_date)} &nbsp;{" "}
                            </p>
                        </span>
                    </div>
                    <div className="description">
                    <i className="fas fa-info-circle">
                            <img src="../../Assets/icons/comment-info.png" alt="description-alt icon" />
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
