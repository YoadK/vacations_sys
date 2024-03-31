import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ProductModel from "../Models/ProductModel";

// Our slice's data is products array.

// Reducer for adding all products to the slice: 
function initAll(currentState: ProductModel[], action: PayloadAction<ProductModel[]>): ProductModel[] {
    // action.payload is all products fetched from backend.
    const allProducts = action.payload;
    const newState = allProducts;
    return newState;
}

// Reducer for adding one product to the slice:  
function addOne(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    // action.payload is a single product to add.
    const productToAdd = action.payload;
    const newState = [...currentState, productToAdd];
    return newState;
}

// Reducer for updating one product in the slice:  
function updateOne(currentState: ProductModel[], action: PayloadAction<ProductModel>): ProductModel[] {
    // action.payload is a single product to update.
    const productToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === productToUpdate.id);
    if(index >= 0) newState[index] = productToUpdate;
    return newState;
}

// Reducer for deleting one product from the slice:  
function deleteOne(currentState: ProductModel[], action: PayloadAction<number>): ProductModel[] {
    // action.payload is the id of the product to delete.
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === idToDelete);
    if(index >= 0) newState.splice(index, 1); // 1 = how many to delete
    return newState;
}

// Create the products slice - containing and managing only the products array: 
const productsSlice = createSlice({
    name: "products", // Unique name for the slice
    initialState: [],
    reducers: { initAll, addOne, updateOne, deleteOne }
});

// Expose a single object containing functions for creating Action objects:
export const productActionCreators = productsSlice.actions;

// Expose a single object containing all reducers:
export const productReducersContainer = productsSlice.reducer;
