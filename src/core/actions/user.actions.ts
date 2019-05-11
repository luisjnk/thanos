import Users from '../../models/Users.model'
import User from '../interfaces/user.interface';
import { convertUserInterfaceIntoAuroraDbInterface } from '../../utils/modelParser/user.model.parser';
import { createUserTransaction } from '../../infra/actions/user.model';
export const findUserbyId = (id) => {
    return Users.findOne({_id: id}, (err: any, user) => {
        console.log(user);
    });
}

export const createUser = async ( user : User) => {

    let userInfra = convertUserInterfaceIntoAuroraDbInterface(user);
    const response = await createUserTransaction(userInfra);
    return response
}