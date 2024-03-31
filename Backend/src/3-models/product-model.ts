import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class ProductModel {

    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public image: UploadedFile;
    public imageUrl: string;

    public constructor(product: ProductModel) { // Copy Constructor.
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.image = product.image;
        this.imageUrl = product.imageUrl;
    }

    // Create a schema for validating product insert:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        name: Joi.string().required().min(2).max(50),
        price: Joi.number().required().min(0).max(1000),
        stock: Joi.number().required().min(0).max(1000).integer(),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200)
    });

    // Create a schema for validating product update:
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().min(1).integer(),
        name: Joi.string().required().min(2).max(50),
        price: Joi.number().required().min(0).max(1000),
        stock: Joi.number().required().min(0).max(1000).integer(),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200)
    });

    // Validating current object against the insert schema:
    public validateInsert(): void {
        const result = ProductModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    // Validating current object against the update schema:
    public validateUpdate(): void {
        const result = ProductModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}
