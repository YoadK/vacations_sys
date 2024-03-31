import axios from "axios";
import SupplierModel from "../Models/SupplierModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { supplierActionCreators } from "../Redux/SuppliersSlice";

class SuppliersService {

    public async getAllSuppliers(): Promise<SupplierModel[]> {
        let suppliers = appStore.getState().suppliers; // Take suppliers from global state
        if(suppliers.length > 0) return suppliers;
        const response = await axios.get<SupplierModel[]>(appConfig.suppliersUrl);
        suppliers = response.data;
        appStore.dispatch(supplierActionCreators.initAll(suppliers)); // Update global state.
        return suppliers;
    }

    public async getOneSupplier(id: number): Promise<SupplierModel> {
        let suppliers = appStore.getState().suppliers; // Take suppliers from global state
        let supplier = suppliers.find(s => s.id === id);
        if(supplier) return supplier;
        const response = await axios.get<SupplierModel>(appConfig.suppliersUrl + id);
        supplier = response.data;
        return supplier;
    }

    public async addSupplier(supplier: SupplierModel): Promise<void> {
        const response = await axios.post<SupplierModel>(appConfig.suppliersUrl, supplier, appConfig.axiosOptions);
        const addedSupplier = response.data;
        appStore.dispatch(supplierActionCreators.addOne(addedSupplier)); // Add to global state.
    }

    public async updateSupplier(supplier: SupplierModel): Promise<void> {
        const response = await axios.put<SupplierModel>(appConfig.suppliersUrl + supplier.id, supplier, appConfig.axiosOptions);
        const updatedSupplier = response.data;
        appStore.dispatch(supplierActionCreators.updateOne(updatedSupplier)); // Update the global state.
    }

    public async deleteSupplier(id: number): Promise<void> {
        await axios.delete(appConfig.suppliersUrl + id);
        appStore.dispatch(supplierActionCreators.deleteOne(id)); // Delete from global state.
    }

}

export const suppliersService = new SuppliersService();
