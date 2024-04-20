import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { ConflictError, UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { RoleModel } from "../3-models/role-model";
import { validate } from 'email-validator';

class AuthService {

    // Register new user:
    public async register(user: UserModel): Promise<string> {
        try {

            // Validate: 
            user.validateInsert();

            //check if email address is valid
            const isEmailAddressValid = this.isEmailValid(user.email);
            
            // If email address is not valid: 
            if (!isEmailAddressValid) throw new ValidationError("Invalid email address");

            // Check if email is taken: 
            const isTaken = await this.isEmailTaken(user.email);

            // If email taken: 
            if (isTaken) throw new ConflictError("Email already exists.");

            // Init roleId as regular user:
            user.roleId = RoleModel.User;

            //init role
            user.role = RoleModel[user.roleId];

            // Hash password:
            user.password = cyber.hashPassword(user.password);


            // Create Prepared Statement: 
            const sql = "INSERT INTO users(firstName, lastName, email, password, roleId) VALUES(?,?,?,?,?)";

            // Execute:
            const info: OkPacketParams = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

            // Set back auto increment id:
            user.id = info.insertId;

            // Create new token: 
            const token = cyber.getNewToken(user);

            // If token is generated successfully, consider password as valid
            if (!token) {
                throw new ValidationError("Invalid password. Please ensure your password meets the required criteria.");
            }

            // Return:
            return token;
        }
        catch (err: any) {
            // if (err instanceof ValidationError) {
            throw err;
            // } else {
            //     throw new Error("Registration failed. Please try again later.");
            // }
        }
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<string> {
        try {
            //validate email address
            if (!this.isEmailValid(credentials.email)) //email  address string is not valid
            {
                throw new Error("Email address string is not valid!");
            }
            // Validate credentials: 
            credentials.validate();

            // Hash password for comparing the hashes:
            credentials.password = cyber.hashPassword(credentials.password);

            // Create Prepared Statement: 
            const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

            // Execute:
            const users = await dal.execute(sql, [credentials.email, credentials.password]);

            // Extract single user:
            const user = users[0];

            if (!user || users.length === 0) {
                throw new UnauthorizedError("Incorrect email or password.");
            }

            // Ensure the user has a role ID defined
            if (user.roleId === undefined) {
                throw new UnauthorizedError("User role ID is missing due to invalid password. cannot proceed.");
            }

            // assign value for user's role
            user.role = RoleModel[user.roleId];

            // Create new token: 
            const token = cyber.getNewToken(user);

            // Return:
            return token;
        }
        catch (err: any) {
            if (err instanceof UnauthorizedError) {
                throw err;
            } else if (err instanceof ValidationError) {
                throw new UnauthorizedError("Invalid email or password.");
            } else {
                throw new Error("Login failed. Please try again later.");
            }
        }
    }

    // Is email taken:
    private async isEmailTaken(email: string): Promise<boolean> {

        // Create sql: 
        const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = '${email}') AS isTaken`;

        // Execute: 
        const result = await dal.execute(sql);

        // Extract is taken: 
        const isTaken = result[0].isTaken;

        // Return:
        return isTaken === 1;
    }

    // Is email address valid:
    private isEmailValid(email: string): boolean {
        
        return validate(email);
    }
}

export const authService = new AuthService();
