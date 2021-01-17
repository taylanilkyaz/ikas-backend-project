import {User} from '../user/entity/User';
import {IPayload} from "../Interface";
const jwt = require("jsonwebtoken");

export const createAccessToken = (user: User) => {
    return jwt.sign({userId: user.id} as IPayload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '10m'
    })
}

export const createRefreshToken = (user: User) => {
    return jwt.sign({userId: user.id} as IPayload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "1d"
    })
}