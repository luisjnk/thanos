import { userMutations } from './resources/users/users.schema'
import { tokenMutations } from './resources/token/token.schema';

/*${tokenMutations}  ${userMutation}*/

  const Mutation = `
    type Mutation {
        ${userMutations}
        ${tokenMutations}
    }
`

export { Mutation }