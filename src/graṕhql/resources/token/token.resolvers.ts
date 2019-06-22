import Users from '../../../models/Users.model'
import { isPassword } from '../../../core/utils';
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../utils/utils';

import { getUser } from '../../../infra/actions/user.model';

export const tokenResolvers = {
    Mutation: {
        createToken: (parent, { email, password }, { mongoose }) => {
            return new Promise(async (resolve, reject) => {

                const users= await getUser(email, password);
                const user = users[0];
                let errorMessage: string = "Unauthorized, wrong email or password"
                if (!user) { throw new Error(errorMessage); }

                //if (!isPassword(user.password, password)) { if (!user) { throw new Error(errorMessage); } }
            
                const payload = { sub: user.idUser }
                const token = { token: jwt.sign(payload, JWT_SECRET) }
                resolve({ token: jwt.sign(payload, JWT_SECRET) })

               /* Users.findOne({ email: email }, (err: any, user: any) => {
                    let errorMessage: string = "Unauthorized, wrong email or password"

                    if (!user) { throw new Error(errorMessage); }
                    if (!isPassword(user.password, password)) { if (!user) { throw new Error(errorMessage); } }

                    const payload = { sub: user._id }

                    const token = { token: jwt.sign(payload, JWT_SECRET) }
                    resolve({ token: jwt.sign(payload, JWT_SECRET) })

                })*/

            })
        }
    }
} 