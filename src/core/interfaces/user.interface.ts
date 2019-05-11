import Person from './person.interface';
import Roles from './role.interface';

export default interface UserCore {

    idUser: number;
    username : string;
    email : string;
    password : string;
    isActive : boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt : string;
    person : Person;
    roles : Roles

}