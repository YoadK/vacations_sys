import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ProductModel } from "../3-models/product-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

// Products service - handling anything with products: 
class ProductsService {

    // Get all products: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // Create query: 
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM products`;

        // Execute: 
        const products = await dal.execute(sql);

        // Return: 
        return products;
    }

    // Get one product: 
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Create query: 
        const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM products WHERE id = ${id}`;

        // Execute (will return array):
        const products = await dal.execute(sql);

        // Extract single product:
        const product = products[0];

        // If product doesn't exist - go to catch-all:
        if (!product) throw new ResourceNotFoundError(id);

        // Return:
        return product;
    }

    // Add new product:
    public async addProduct(product: ProductModel): Promise<ProductModel> {

        // Validate:
        product.validateInsert();

        // Save image to hard-disk:
        const imageName = await fileSaver.add(product.image,);

        // Create query: 
        const sql = `INSERT INTO products(name, price, stock, imageName)
            VALUES('${product.name}', ${product.price}, ${product.stock}, '${imageName}')`;

        // Execute (returns an info object containing data regarding the INSERT):
        const info: OkPacketParams = await dal.execute(sql);

        // // Set back to product the new id: 
        // product.id = info.insertId;

        // // Remove image from product:
        // delete product.image;

        // // Set imageUrl in product object:
        // product.imageUrl = appConfig.baseImageUrl + imageName;

        // Instead of the above three lines - get added product from the database:
        product = await this.getOneProduct(info.insertId);

        // Return:
        return product;
    }

    // Update full product:
    public async updateProduct(product: ProductModel): Promise<ProductModel> {

        // Validate:
        product.validateUpdate();

        // Get old image name: 
        const oldImageName = await this.getImageName(product.id);

        // Update image in the hard-disk: 
        const newImageName = product.image ? await fileSaver.update(oldImageName, product.image) : oldImageName;

        // Prepared Statement: 
        const sql = "UPDATE products SET name = ?, price = ?, stock = ?, imageName = ? WHERE id = ?";

        // Execute (returns an info object containing data regarding the UPDATE):
        const info: OkPacketParams = await dal.execute(sql, [product.name, product.price, product.stock, newImageName, product.id]);

        // If product doesn't exist - go to catch-all:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(product.id);

        // // Remove image from product:
        // delete product.image;

        // // Set imageUrl in product object:
        // product.imageUrl = appConfig.baseImageUrl + newImageName;

        // Instead of the above two lines - get updated product from the database:
        product = await this.getOneProduct(product.id);

        // Return:
        return product;
    }

    // Delete product: 
    public async deleteProduct(id: number): Promise<void> {

        // Get image name from database for later delete:
        const imageName = await this.getImageName(id);
        
        // Create query: 
        const sql = `DELETE FROM products WHERE id = ${id}`;

        // Execute (returns an info object containing data regarding the DELETE):
        const info: OkPacketParams = await dal.execute(sql);

        // If product doesn't exist - go to catch-all:
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

        // Delete image from hard-disk:
        await fileSaver.delete(imageName);
    }

    // Get image name from database: 
    private async getImageName(id: number): Promise<string> {

        // Create sql:
        const sql = `SELECT imageName FROM products WHERE id = ${id}`;

        // Execute: 
        const products = await dal.execute(sql);

        // Extract product: 
        const product = products[0];

        // Return null if not found:
        if (!product) return null;

        // Extract imageName: 
        const imageName = product.imageName;

        // Return:
        return imageName;
    }

}

export const productsService = new ProductsService();
