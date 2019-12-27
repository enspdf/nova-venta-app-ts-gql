import "reflect-metadata";
import { createSchema } from "./utils/CreateSchema";
import "dotenv/config";

import { ApolloServer } from "apollo-server";
import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import typeorm from "typeorm";
import { useContainer } from "typeorm"
import { Container } from "typedi";

import { createTypeOrmConnection } from "./utils/CreateTypeOrmConnection";

useContainer(Container);

(async () => {
    const app = express();
    const RedisStore = connectRedis(session);

    app.use(cookieParser());
    app.use(cors());

    await createTypeOrmConnection();
    const schema = await createSchema();

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        formatError: error => {
            const { message, extensions, path } = error;
            return { message, code: extensions.code, path };
        },
        introspection: true,
        playground: true
    });

    const { url } = await server.listen(process.env.PORT || 4000);
    console.log(`Server available at ${url}`);
})();