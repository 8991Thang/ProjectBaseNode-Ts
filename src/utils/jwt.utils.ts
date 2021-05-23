import jwt from "jsonwebtoken"
export const signToken = (object: Object, privateKey: string, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, options)
}
export const verifyToken = (token: string, privateKey: string, options?: jwt.SignOptions | undefined) => {
    return jwt.verify(token, privateKey, options)
}

export const decodeToken = (token: string) => {
    return jwt.decode(token)
}