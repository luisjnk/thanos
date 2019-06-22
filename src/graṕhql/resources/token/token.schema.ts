const tokenTypes = `
    type Token {
        token: String!,
        success: String!
    }
`

const tokenMutations = `
        createToken(email: String!, password: String!) : Token   
`

export {
    tokenTypes,
    tokenMutations
}