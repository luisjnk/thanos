import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash'
//resolvers
import { userResolvers } from './resources/users/users.resolvers'
import { tokenResolvers } from './resources/token/token.resolvers';


//schemas
import { userTypes } from './resources/users/users.schema'
import { tokenTypes } from './resources/token/token.schema'

//
import { Query } from './query';
import { Mutation } from './mutation';

import Users from '../models/Users.model';

const SchemaDefinition = `
type Schema{
    query: Query,
    mutation: Mutation
}`

const resolvers = merge(
    userResolvers,
    tokenResolvers
    )


export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        userTypes,
        tokenTypes
    ], resolvers
})