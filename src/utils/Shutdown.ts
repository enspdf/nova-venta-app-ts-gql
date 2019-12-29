import redisClient from "ioredis";
import { Server } from "net";
import pino from "pino";
import { Connection } from "typeorm";

const shutdown = async ({ db, redisClient, logger, nodeServer }: ShutdownOptions): Promise<void> => {
    logger.warn("Shutting down HTTP server.");
    nodeServer.close(() => {
        logger.warn("HTTP server closed.");
        redisClient.disconnect();
        logger.warn("Redis disconnected.");

        db.close().then(() => {
            logger.warn("Database disconnected.");
            const finalLogger = pino.final(logger);
            finalLogger.warn("Bye.");
            process.exit(1);
        });
    });
};

export interface ShutdownOptions {
    db: Connection;
    redisClient: redisClient.Redis;
    logger: pino.Logger;
    nodeServer: Server;
};

export const setupErrorHandling = (config: ShutdownOptions): void => {
    process.on("uncaughtException", err => {
        config.logger.error(err, "Uncaught Exception");
        shutdown(config);
    });

    process.on("unhandledRejection", err => {
        config.logger.error(err, "Uncaught Rejection");
        shutdown(config);
    });

    process.on("SIGINT", async () => {
        config.logger.warn("Node process terminated via SIGINT...");
        shutdown(config);
    });
};