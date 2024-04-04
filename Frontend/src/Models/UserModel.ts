import { userModelServiceFront } from "../Services/UserModelServiceFront";


class UserModel {
    public id: number;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
    public roleId: number;
    public role: string;

    public constructor ()
    {
       
               
        this.role = userModelServiceFront.getRoleFromId(this.roleId);
    }

  
    

    
}

export default UserModel;
