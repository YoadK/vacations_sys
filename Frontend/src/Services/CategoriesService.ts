import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class CategoriesService {

    // Get total categories: 
    public async getTotalCategories(): Promise<number> {
        const response = await axios.get<any[]>(appConfig.categoriesUrl);
        const categories = response.data;
        return categories.length;
    }    

}

export const categoriesService = new CategoriesService();
