import Redis from "ioredis";

export const redis =
    process.env.NODE_ENV === "production"
        ? new Redis({
            port: (process.env.REDIS_PORT!) as any,
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD
        })
        : new Redis();