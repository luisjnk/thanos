import User from "../../infra/interface/user";
import UserCore from "../../core/interfaces/user.interface";

export const convertUserInterfaceIntoAuroraDbInterface = (user : UserCore) => {
     let UserInfra : User = {
        username : user.username,
        email: user.email,
        roles : user.roles,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
        deletedAt: user.deletedAt,
        idUser: user.idUser,
        isActive: user.isActive,
        password: user.password,
        person: user.person
     }

     return UserInfra;
}