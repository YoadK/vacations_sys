import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SupplierModel from "../Models/SupplierModel";


// init suppliers reducer:
function initAll(currentState: SupplierModel[], action: PayloadAction<SupplierModel[]>): SupplierModel[] {
    const allSuppliers = action.payload;
    const newState = allSuppliers;
    return newState;
}

// add supplier reducer:
function addOne(currentState: SupplierModel[], action: PayloadAction<SupplierModel>): SupplierModel[] {
    const supplierToAdd = action.payload;
    const newState = [...currentState, supplierToAdd];
    return newState;
}

// update supplier reducer:
function updateOne(currentState: SupplierModel[], action: PayloadAction<SupplierModel>): SupplierModel[] {
    const supplierToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(s => s.id === supplierToUpdate.id);
    if (index >= 0) newState[index] = supplierToUpdate;
    return newState;
}

// delete supplier reducer:
function deleteOne(currentState: SupplierModel[], action: PayloadAction<number>): SupplierModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(s => s.id === idToDelete);
    if (index >= 0) newState.splice(index, 1);
    return newState;
}

// create slice:
const suppliersSlice = createSlice({
    name: "suppliers",
    initialState: [],
    reducers: { initAll, addOne, updateOne, deleteOne },
});

// export action creators:
export const supplierActionCreators = suppliersSlice.actions;

// export reducers container: 
export const supplierReducersContainer = suppliersSlice.reducer;
