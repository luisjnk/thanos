import Users from '../../models/Users.model'

export const findUserbyId = (id) => {
    return Users.findOne({_id: id}, (err: any, user) => {
        console.log(user);
    });
}

