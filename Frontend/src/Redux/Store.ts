import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { productReducersContainer } from "./ProductsSlice";
import { supplierReducersContainer } from "./SuppliersSlice";
import { authReducersContainer } from "./AuthSlice";
import { vacationReducersContainer } from "./VacationsSlice";

// Creating the application store - the redux manager object: 
export const appStore = configureStore<AppState>({
    reducer: {
        products: productReducersContainer,
        suppliers: supplierReducersContainer,
        vacations: vacationReducersContainer,
        user: authReducersContainer
    }
});

