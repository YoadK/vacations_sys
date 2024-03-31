export class CategoryModel {

    public id: number;
    public name: string;
    public description: string;

    public constructor(category: CategoryModel) { // Copy Constructor
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
    }

}
