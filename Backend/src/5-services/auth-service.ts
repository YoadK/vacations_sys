import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { RoleModel } from "../3-models/role-model";

class AuthService {

    // Register new user:
    public async register(user: UserModel): Promise<string> {

        // Validate: 
        user.validateInsert();

        //check if email address is valid
        const isEmailAddressValid = this.isEmailValid(user.email);

        // If email address is not valid: 
        if (!isEmailAddressValid) throw new ValidationError("Email Address is not valid.");

        // Check if email is taken: 
        const isTaken = await this.isEmailTaken(user.email);

        // If email taken: 
        if (isTaken) throw new ValidationError("Email already taken.");

        // Init roleId as regular user:
        user.roleId = RoleModel.User;

       //init role
        user.role=RoleModel[user.roleId];

        // Hash password:
        user.password = cyber.hashPassword(user.password);

        // Create sql:
        // const sql = `INSERT INTO users(firstName, lastName, email, password, roleId)
        //     VALUES('${user.firstName}','${user.lastName}','${user.email}','${user.password}',${user.roleId})`;

        // Create Prepared Statement: 
        const sql = "INSERT INTO users(firstName, lastName, email, password, roleId) VALUES(?,?,?,?,?)";

        // Execute:
        const info: OkPacketParams = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId]);

        // Set back auto increment id:
        user.id = info.insertId;

        // Create new token: 
        const token = cyber.getNewToken(user);

        // Return:
        return token;
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<string> {

        //validate email address
        if (!this.isEmailValid(credentials.email)) //email  address string is not valid
        {
            throw new Error("Email address string is not valid!");
        }

        // Validate credentials: 
        credentials.validate();

        // Hash password for comparing the hashes:
        credentials.password = cyber.hashPassword(credentials.password);

        // Create sql:
        // const sql = `SELECT * FROM users WHERE email = '${credentials.email}' AND password = '${credentials.password}'`;

        // Create Prepared Statement: 
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

        // Execute:
        const users = await dal.execute(sql, [credentials.email, credentials.password]);

        // Extract single user:
        const user = users[0];

        // assign value for user's role
        user.role=RoleModel[user.roleId];
        
        // If no such user: 
        if (!user) throw new UnauthorizedError("Incorrect email or password.");

        // Create new token: 
        const token = cyber.getNewToken(user);

        // Return:
        return token;
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
        let isValid = false;
        //Basic Email Validation:
        let pattern1 = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        //Email Validation with RFC 5321 Specification
        let pattern2 = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        //Email Validation with Optional Domain:
        let pattern3 = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?$";
        //Email Validation with Specific TLDs:
        let pattern4 = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu)$";
        //Email Validation with Case Insensitivity:
        let pattern5 = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        //Advanced Email Validation (with Length Limits)
        let pattern6="^.{1,254}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        if (email.match(pattern1)|| email.match(pattern2)|| email.match(pattern3)||
         email.match(pattern4)|| email.match(pattern5)|| email.match(pattern6))
         {
            isValid = true;
        }
        return isValid;
    }
}

export const authService = new AuthService();
