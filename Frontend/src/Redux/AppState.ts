import UserModel from "../Models/UserModel";
import { VacationModel } from "../Models/vacation-model";

// Application global state: 
export type AppState = {

    

     // first slice data - array of vacations: 
     vacations: VacationModel[];



    // fourth slice data - the user:
    user: UserModel;
};
