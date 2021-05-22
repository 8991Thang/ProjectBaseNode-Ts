import jwt from "jsonwebtoken"
export const sign = (object: Object, privateKey: string, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, options)
}