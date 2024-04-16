import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/vacation-model";



// Our slice's data is vacations array.

// Reducer for adding all vacations to the slice: 
function initAll(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    // action.payload is all vacations fetched from backend.
    const allVacations = action.payload;
    const newState = allVacations;
    return newState;
}




// Reducer for adding one vacation to the slice:  
function addOne(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    // action.payload is a single vacation to add.
    const vacationToAdd = action.payload;
    const newState = [...currentState, vacationToAdd];
    return newState;
}

// Reducer for updating one vacation in the slice:  
function updateOne(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    // action.payload is a single vacation to update.
    const vacationToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === vacationToUpdate.id);
    if (index >= 0) newState[index] = vacationToUpdate;
    return newState;
}

// Reducer for deleting one vacation from the slice:  
function deleteOne(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    // action.payload is the id of the vacation to delete.
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === idToDelete);
    if (index >= 0) newState.splice(index, 1); // 1 = how many to delete
    return newState;
}

function updateLikes_slice(currentState: VacationModel[], action: PayloadAction<{ vacationId: number; totalLikesCount: number, isLikedByCurrentUser: boolean }>): VacationModel[] {

    const { vacationId, totalLikesCount, isLikedByCurrentUser } = action.payload;
    return currentState.map(vacation => {
        if (vacation.id === vacationId) {
            return { ...vacation, totalLikesCount, isLikedByCurrentUser };
        }
        return vacation;
    });
}






// Create the vacations slice - containing and managing only the vacations array: 
const vacationsSlice = createSlice({
    name: "vacations", // Unique name for the slice
    initialState: [],
    reducers: { initAll, addOne, updateOne, deleteOne, updateLikes_slice }
}); 

// Expose a single object containing functions for creating Action objects:
export const vacationActionCreators = vacationsSlice.actions;

// Expose a single object containing all reducers:
export const vacationReducersContainer = vacationsSlice.reducer;


