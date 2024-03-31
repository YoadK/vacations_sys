import Joi from "joi";
import { ValidationError } from "./client-errors";
import { RoleModel } from "./role-model";

export class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // Create a schema for validation:
    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(4).max(50),
        lastName: Joi.string().required().min(4).max(50),
        email: Joi.string().required().min(5).max(100).email(),
        password: Joi.string().required().min(4).max(50),
        roleId: Joi.number().optional().equal(RoleModel.Admin, RoleModel.User)
    });

    // Validating current object against the insert schema:
    public validateInsert(): void {
        const result = UserModel.insertValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

