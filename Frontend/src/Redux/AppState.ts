import ProductModel from "../Models/ProductModel";
import SupplierModel from "../Models/SupplierModel";
import UserModel from "../Models/UserModel";
import { VacationModel } from "../Models/vacation-model";

// Application global state: 
export type AppState = {

    // First slice data - array of products: 
    products: ProductModel[];

    // Second slice data - array of suppliers: 
    suppliers: SupplierModel[];

     // third slice data - array of suppliers: 
     vacations: VacationModel[];



    // fourth slice data - the user:
    user: UserModel;
};
