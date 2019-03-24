import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export const isPassword = (encodedPassword: string, password: string): boolean => {
    return compareSync(password, encodedPassword)
}