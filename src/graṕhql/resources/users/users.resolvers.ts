import Users from '../../../models/Users.model';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { GraphQLResolveInfo } from 'graphql';
import { compose } from '../../composable/composable.resolver';
import { authResolver } from '../../composable/auth.resolver';
import { verifyTokenResolver } from '../../composable/verify-token.resolver';
import { AuthUser } from '../../../interfaces/AuthUserInterface';

export const userResolvers = {
    Query: {
        users: compose(authResolver, verifyTokenResolver)((parent, args, { mongoose }, info: GraphQLResolveInfo) => {
            return Users.find({}, (err: any, user) => {
                console.log(user)
            });
        }),
        user: (parent, args, { mongoose }, info: GraphQLResolveInfo) => {
            return Users.findOne({}, (err: any, user) => {
                console.log(user);
            });
        }
    },
    Mutation: {
        createUser: (parent, args, { mongoose, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            //const newUser = Object.assign(args);
            //users.push(newUser);
            console.log('aqui', args)
            const salt = genSaltSync();
            console.log('salt', salt)

            const password = hashSync(args.input.password, salt)
            console.log('password', password)

            let user = new Users({
                name: args.input.name,
                email: args.input.email,
                password: password
            })

            console.log('user', user)

            return user.save();
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

