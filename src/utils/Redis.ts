import Redis from "ioredis";

export const redis =
    process.env.REDIS_URL === "production"
        ? new Redis(process.env.REDIS_URL!)
        : new Redis();