import { userQueries } from './resources/users/users.schema'

const Query = `
    type Query {
        ${userQueries}
    }
`

export { Query }