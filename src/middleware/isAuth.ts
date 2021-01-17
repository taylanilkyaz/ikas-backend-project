import {IPayload, Interface} from '../Interface';
import {MiddlewareFn} from "type-graphql";
import {verify} from 'jsonwebtoken';
import {ApolloError, AuthenticationError} from 'apollo-server-express';

export const isAuth: MiddlewareFn<Interface> = ({context}, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
        throw new AuthenticationError("You should add bearer token in headers")
    }

    try {
        const token = authorization.replace('Bearer ', '');
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload! as IPayload;
    } catch (err) {
        throw new ApolloError(err, "INVALID_TOKEN");
    }

    return next();
}