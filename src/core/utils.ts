import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export const isPassword = (encodedPassword: string, password: string): boolean => {
    console.log('compare pass before')
    return compareSync(password, encodedPassword)
}