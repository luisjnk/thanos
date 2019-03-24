import { makeExecutableSchema } from 'graphql-tools';
import Users from '../models/Users';

const users: any[] = [
    {
        id:1,
        name: 'luis',
        email: 'luisjnk@gmail.com',
        password: '1234'
    },
    {
        id:2,
        name: 'luis2',
        email: 'luis2jnk@gmail.com',
        password: '12344'
    }
]

const typeDefs = `
    type User {
        id: ID!,
        name: String!
        email: String!,
        password: String!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name : String!, email : String!, password : String!) : User
    }
`

const resolvers = {
    Query: {
        allUsers: () => users
    },
    Mutation: {
        createUser : (parent, args) => {
            //const newUser = Object.assign(args);
            //users.push(newUser);
            console.log('aqui', args)

            let user = new Users({
                name : args.name,
                email : args.email,
                password : args.password
            })
            console.log('aqui2', args)
            return user.save();
        }
    }
}

export default makeExecutableSchema({typeDefs, resolvers})