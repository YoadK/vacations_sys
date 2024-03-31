import express, { NextFunction, Request, Response } from "express";
import { productsService } from "../5-services/products-service";
import { StatusCode } from "../3-models/enums";
import { ProductModel } from "../3-models/product-model";
import { securityMiddleware } from "../4-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";

// Products controller - listens to product requests:
class ProductsController {

    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();

    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.get("/products", this.getAllProducts);
        this.router.get("/products/:id(\\d+)", this.getOneProduct); // \\d --> Digit, + --> One or more
        this.router.post("/products", securityMiddleware.verifyLoggedIn, this.addProduct);
        this.router.put("/products/:id(\\d+)", securityMiddleware.verifyLoggedIn, this.updateProduct);
        this.router.delete("/products/:id(\\d+)", securityMiddleware.verifyLoggedIn, securityMiddleware.verifyAdmin, this.deleteProduct);
        this.router.get("/products/images/:imageName", this.getImageFile);
    }

    // GET http://localhost:4000/api/products
    private async getAllProducts(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const products = await productsService.getAllProducts();
            response.json(products); // status = 200
        }
        catch (err: any) { next(err); }
    }

    // GET http://localhost:4000/api/products/8
    private async getOneProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            const product = await productsService.getOneProduct(id);
            response.json(product); // status = 200
        }
        catch (err: any) { next(err); }
    }

    // POST http://localhost:4000/api/products
    private async addProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.image = request.files?.image;
            const product = new ProductModel(request.body);
            const addedProduct = await productsService.addProduct(product);
            response.status(StatusCode.Created).json(addedProduct);
        }
        catch (err: any) { next(err); }
    }

    // PUT http://localhost:4000/api/products/8
    private async updateProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            request.body.id = +request.params.id;
            request.body.image = request.files?.image;
            const product = new ProductModel(request.body);
            const updatedProduct = await productsService.updateProduct(product);
            response.json(updatedProduct); // Status = 200
        }
        catch (err: any) { next(err); }
    }

    // DELETE http://localhost:4000/api/products/8
    private async deleteProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = +request.params.id;
            await productsService.deleteProduct(id);
            response.sendStatus(StatusCode.NoContent); // status + send
        }
        catch (err: any) { next(err); }
    }

    // GET http://localhost:4000/products/images/:imageName
    private async getImageFile(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, true);
            response.sendFile(imagePath); // Response the actual image file.
        }
        catch (err: any) { next(err); }
    }
}

const productsController = new ProductsController();
export const productsRouter = productsController.router;
