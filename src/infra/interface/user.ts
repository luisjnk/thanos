import Person from './person';
import Roles from './roles';

export default interface User {

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