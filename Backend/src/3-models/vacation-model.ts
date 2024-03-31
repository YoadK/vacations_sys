import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class VacationModel {
    id: number;
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    

    image: UploadedFile;
    imageUrl: string;

    isLikedByCurrentUser: boolean;
    totalLikesCount: number


    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start_date = vacation.start_date;
        this.end_date = vacation.end_date;
        this.price = vacation.price;
        

        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl ? vacation.imageUrl : "../src/1-assets/images/vacation_default-image.png";

        this.isLikedByCurrentUser= vacation.isLikedByCurrentUser? true:false;
        this.totalLikesCount = vacation.totalLikesCount? vacation.totalLikesCount:0;
    }

    

    
    // Create a schema for validating vacation insert:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(45),
        description: Joi.string().required().min(2).max(75),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        price: Joi.number().required().min(0).max(9999),
        // image_name: Joi.string().optional,

        image: Joi.object().required(),
        imageUrl: Joi.string().optional().max(200),

        isLikedByCurrentUser: Joi.boolean().optional(),
        totalLikesCount: Joi.number().optional()
    });


   
  


    // Create a schema for validating vacation update:
    private static updateValidationSchema = Joi.object({
        id: Joi.number().required(),
        destination: Joi.string().required().min(2).max(45),
        description: Joi.string().required().min(2).max(75),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        price: Joi.number().required().min(0).max(9999),
        // image_name: Joi.string().optional,

        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200),

        isLikedByCurrentUser: Joi.boolean().optional(),
        totalLikesCount: Joi.number().optional()
    });

    // Validating current object against the insert schema:
    public validateInsert(): void {
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    // Validating current object against the update schema:
    public validateUpdate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}