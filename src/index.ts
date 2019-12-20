import 'dotenv/config';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import * as connectRedis from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';

import { createTypeOrmConnection } from './utils/CreateTypeOrmConnection';

(async () => {
    const app = express();
    const RedisStore = connectRedis(session);

    app.use(cookieParser());
    app.use(cors());

    await createTypeOrmConnection();

    const server = new ApolloServer({
        typeDefs: `
            type Hello {
                message: String!
            }

            type Query {
                sayHello(name: String!): Hello
            }
        `,
        resolvers: {
            Query: {
                sayHello: (_, args) => {
                    return {
                        message: `Hello ${args.name || "World"}`
                    };
                }
            }
        },
        context: ({ req, res }) => ({ req, res }),
        formatError: error => {
            const { message, extensions, path } = error;
            return { message, code: extensions.code, path };
        }
    });

    const { url } = await server.listen(4000);
    console.log(`Server available at ${url}`);
})();