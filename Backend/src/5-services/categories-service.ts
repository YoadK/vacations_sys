import { dal } from "../2-utils/dal";
import { CategoryModel } from "../3-models/category-model";

class CategoriesService {

    // Get all categories:
    public async getAllCategories(): Promise<CategoryModel[]> {
        const sql = "SELECT * FROM categories";
        const categories = await dal.execute(sql);
        return categories;
    }

}

export const categoriesService = new CategoriesService();
