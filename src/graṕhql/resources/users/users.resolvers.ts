import Users from '../../../models/Users.model';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { GraphQLResolveInfo } from 'graphql';
import { compose } from '../../composable/composable.resolver';
import { authResolver } from '../../composable/auth.resolver';
import { verifyTokenResolver } from '../../composable/verify-token.resolver';
import { AuthUser } from '../../../interfaces/AuthUserInterface';
import { createUser } from '../../../core/actions/user.actions';
import PersonCore from '../../../core/interfaces/person.interface';
import RolesCore from '../../../core/interfaces/role.interface';
import UserCore from '../../../core/interfaces/user.interface';
import { getUsers } from '../../../infra/actions/user.model';

export const userResolvers = {
    Query: {
        users: compose(authResolver, verifyTokenResolver)(async (parent, args, {  }, info: GraphQLResolveInfo) => {
            const usersList = await getUsers()
            let usersResolver = [];
            usersList.forEach(element => {
                usersResolver.push({
                    id: element.idUser,
                    email: element.Email,
                    username: element.Username,
                    password: element.Password,
                    roleName: 'Admin',
                
                })
            });
            console.log(usersList)
            return usersResolver
        }),
        user: (parent, args, { mongoose }, info: GraphQLResolveInfo) => {
            return Users.findOne({}, (err: any, user) => {
                console.log(user);
            });
        }
    },
    Mutation: {
        createUser: (parent, args, { mongoose, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            const salt = genSaltSync();
            const password = hashSync(args.input.password, salt)
            let person : PersonCore = {
                name : args.input.name,
                birthdate:'2019-01-01'
            }
            let roles : RolesCore = {
                name: args.input.roleName
            }
            let user : UserCore = {
                username: args.input.username,
                roles,
                person,
                email : args.input.email,
                password : password
            }

            console.log('aqui', user)
            
            return createUser(user);
        },
        updateUser: (parent, {input}, { mongoose,  authUser: AuthUser }, info: GraphQLResolveInfo) => {
            console.log('updateUSer')
        },
        updatePassword: (parent, {id, input}, { mongoose }, info: GraphQLResolveInfo) => {
            console.log('updatePasse')
        },
        deleteUser: (parent, {id}, { mongoose }, info: GraphQLResolveInfo) => {
            console.log('deleteuser')
        },
    }
}

