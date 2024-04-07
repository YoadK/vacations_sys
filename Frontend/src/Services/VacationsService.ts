import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { VacationModel } from "../Models/vacation-model";
import { vacationActionCreators } from "../Redux/VacationsSlice";


class VacationsService {

    // Get all vacations With Likes from backend:
    public async getAllVacationsWithLikes(userId: number): Promise<VacationModel[]> {


        try {
            // Get all vacations from backend: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationsWithLikesUrl);

            // Extract vacations from the response:
            const vacations = response.data;
            
            // Create action for init all vacations: 
            const action = vacationActionCreators.initAll(vacations);
            //here i can check the global state's 'vacations' : let vacations = appStore.getState().vacations;// IT GETS THE OLD vacations array!
            // Send action to global state: 
            appStore.dispatch(action);

            
            // Return vacations to the component:
            return vacations;
        }
        catch (error) {
            console.error("Error getting all vacations:", error);
        }
    }

    // Get all vacations from backend:
    public async getAllVacations(): Promise<VacationModel[]> {

        // Get all vacations from global state: 
        let vacations = appStore.getState().vacations;

        // If we have the vacations in the global state - return them:
        if (vacations.length > 0) return vacations;

        // Get all vacations from backend: 
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

        // Extract vacations from the response:
        vacations = response.data;

        // Create action for init all vacations: 
        const action = vacationActionCreators.initAll(vacations);

        // Send action to global state: 
        appStore.dispatch(action);

        // Return vacations to the component:
        return vacations;
    }

    // Get one vacation: 
    public async getOneVacation(id: number): Promise<VacationModel> {

        // Get all vacations from global state: 
        let vacations = appStore.getState().vacations;

        // Find the desired vacation: 
        let vacation = vacations.find(v => v.id === id);

        // If we have that vacation in the global state - return it:
        if (vacation) return vacation;

        // Get that vacation from the backend: 
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);

        // Extract the vacation from the response: 
        vacation = response.data;

        // Return the vacation:
        return vacation;
    }

    // Add vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {
        
        // Add the new vacation to backend:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, appConfig.axiosOptions);

        // Extract the added vacation from the response:
        const addedVacation = response.data;

        // Create action for adding a vacation to the global state: 
        const action = vacationActionCreators.addOne(addedVacation);

        // Send action to global state: 
        appStore.dispatch(action);
    }

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {


        
        // Send the update to backend:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, vacation, appConfig.axiosOptions);

        

        // Extract the updated vacation from the backend:
        const updatedVacation = response.data;

        // Create action for updating a vacation in the global state: 
        const action = vacationActionCreators.updateOne(updatedVacation);

        // Send action to global state: 
        appStore.dispatch(action);
    }

    // Delete vacation: 
    public async deleteVacation(id: number): Promise<void> {

        // Delete vacation from backend: 
        await axios.delete(appConfig.vacationsUrl + id);

        // Create action for deleting a vacation from the global state: 
        const action = vacationActionCreators.deleteOne(id);

        // Send action to global state: 
        appStore.dispatch(action);
    }


    // update Vacation Likes status and count (this function actually toggle vacation status according to the current 'like' value  )
    public async updateVacationLikesStatusAndCount(vacationId: number, userId: number, isLiked: boolean): Promise<void> {
        try {

            // Send a PUT request to the backend endpoint with vacationId        
            const response = await axios.put<VacationModel>(`${appConfig.vacationsUrl}${vacationId}/like`);

            // Extract the updated vacation from the backend:
            const updatedVacation = response.data;

            // Extract the updated 'like' value from the backend:
            const totalLikesCount = updatedVacation.totalLikesCount;
            const isLikedByCurrentUser = updatedVacation.isLikedByCurrentUser;

            // Create action for updating a vacation in the global state: 
            const action = vacationActionCreators.updateLikes_SLC({ vacationId, totalLikesCount, isLikedByCurrentUser })
            appStore.dispatch(action);



        }
        catch (error) {
            console.error("Error updating like count:", error);

        }
    }

}

export const vacationsService = new VacationsService();
