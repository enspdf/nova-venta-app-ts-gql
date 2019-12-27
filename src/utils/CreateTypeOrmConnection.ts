import { createConnection, getConnectionOptions, ConnectionOptions, getConnection } from 'typeorm';

export const createTypeOrmConnection = async () => {
    const environment = process.env.NODE_ENV || "dev";
    let connectionOptions: ConnectionOptions = await getConnectionOptions(environment);

    return createConnection({ ...connectionOptions, name: "default" });
}

export const CloseTypeOrmConnection = async () => {
    getConnection().close();
};