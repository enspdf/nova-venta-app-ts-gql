import { Container } from 'typedi';
import { createConnection, getConnectionOptions, useContainer } from 'typeorm';

export const createTypeOrmConnection = async () => {
    const environment = process.env.NODE_ENV || "dev";
    const connectionOptions = await getConnectionOptions(environment);
    useContainer(Container);
    return createConnection({ ...connectionOptions, name: "default" });
}