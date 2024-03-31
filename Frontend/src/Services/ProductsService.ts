import axios from "axios";
import ProductModel from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { productActionCreators, productReducersContainer } from "../Redux/ProductsSlice";

class ProductsService {

    // Get all products from backend:
    public async getAllProducts(): Promise<ProductModel[]> {

        // Get all products from global state: 
        let products = appStore.getState().products;

        // If we have the products in the global state - return them:
        if (products.length > 0) return products;

        // Get all products from backend: 
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

        // Extract products from the response:
        products = response.data;

        // Create action for init all products: 
        const action = productActionCreators.initAll(products);

        // Send action to global state: 
        appStore.dispatch(action);

        // Return products to the component:
        return products;
    }

    // Get one product: 
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Get all products from global state: 
        let products = appStore.getState().products;

        // Find the desired product: 
        let product = products.find(p => p.id === id);

        // If we have that product in the global state - return it:
        if (product) return product;

        // Get that product from the backend: 
        const response = await axios.get<ProductModel>(appConfig.productsUrl + id);

        // Extract the product from the response: 
        product = response.data;

        // Return the product:
        return product;
    }

    // Add product: 
    public async addProduct(product: ProductModel): Promise<void> {

        // Add the new product to backend:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, appConfig.axiosOptions);

        // Extract the added product from the response:
        const addedProduct = response.data;

        // Create action for adding a product to the global state: 
        const action = productActionCreators.addOne(addedProduct);

        // Send action to global state: 
        appStore.dispatch(action);
    }

    // Update product: 
    public async updateProduct(product: ProductModel): Promise<void> {

        // Send the update to backend:
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, appConfig.axiosOptions);

        // Extract the updated product from the backend:
        const updatedProduct = response.data;

        // Create action for updating a product in the global state: 
        const action = productActionCreators.updateOne(updatedProduct);

        // Send action to global state: 
        appStore.dispatch(action);
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Delete product from backend: 
        await axios.delete(appConfig.productsUrl + id);

        // Create action for deleting a product from the global state: 
        const action = productActionCreators.deleteOne(id);

        // Send action to global state: 
        appStore.dispatch(action);
    }
}

export const productsService = new ProductsService();
