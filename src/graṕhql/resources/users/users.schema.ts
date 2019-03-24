const userTypes = `
    type User {
        id: ID!,
        name: String!
        email: String!,
        password: String!
        photo: String
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdatePasswordInput {
        password: String!
    }
`
const userQueries = `
    users(first: Int, offset: Int): [User! ]!
    user(id: ID!): User
`
const userMutations = `
    createUser(input: UserCreateInput) : User
    updateUser(id: ID!, input: UserUpdateInput) : User
    updatePassword(id: ID!, input: UserUpdatePasswordInput!) : Boolean
    deleteUser(id: ID!): Boolean
`
export {
    userTypes,
    userQueries,
    userMutations
}