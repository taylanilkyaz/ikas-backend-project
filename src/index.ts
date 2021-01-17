import {ProductResolver} from './product/ProductResolver';
import "dotenv/config";
import "reflect-metadata";
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {UserResolver} from "./user/UserResolver";
import {createConnection} from 'typeorm';

(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ProductResolver]
        }),
        context: ({req, res}) => ({req, res})
    });
    apolloServer.applyMiddleware({app});
    app.listen(4000, () => {
        console.log("express server started");
    });
})();