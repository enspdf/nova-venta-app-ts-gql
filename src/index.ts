import "reflect-metadata";
import "dotenv/config";

import connectRedis from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";

import { ApolloServer, ApolloError } from "apollo-server";
import { useContainer, getConnection } from "typeorm"
import { Container } from "typedi";
import { redis } from "./utils/Redis";
import { createSchema } from "./utils/CreateSchema";
import { createTypeOrmConnection } from "./utils/CreateTypeOrmConnection";
// import { setupErrorHandling } from "./utils/Shutdown";
import { logManager } from "./utils/LogManager";

const SESSION_SECRET = process.env.SESSION_SECRET;
const RedisStore = connectRedis(session);
const logger = logManager();

useContainer(Container);

(async () => {
    const app = express();

    app.use(cookieParser());
    app.use(cors({
        credentials: true
    }));
    app.use(session({
        store: new RedisStore({
            client: redis as any
        }),
        name: "qid",
        secret: SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365
        }
    }));

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

    const PORT = process.env.PORT || 4000;

    const { url } = await server.listen(PORT);
    console.log(`Server available at ${url}`);

    /*const nodeServer = server.listen({ port: PORT, }, () => {
        console.log(`Server available at http://localhost:${PORT}${server.graphqlPath}`);
    });

    setupErrorHandling({
        db: getConnection(),
        redisClient: redis,
        logger: logger,
        nodeServer: (await nodeServer).server
    });*/
})();