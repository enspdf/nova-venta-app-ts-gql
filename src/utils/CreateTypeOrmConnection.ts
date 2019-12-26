import { createConnection, getConnectionOptions, ConnectionOptions } from 'typeorm';

export const createTypeOrmConnection = async () => {
    const environment = process.env.NODE_ENV || "dev";
    let connectionOptions: ConnectionOptions
    //let connectionOptions: ConnectionOptions = await getConnectionOptions(environment);

    if (environment === "dev" || environment === "test") {
        connectionOptions = await getConnectionOptions(environment);
    } else if (environment === "production") {
        connectionOptions = Object.assign({
            name: environment,
            type: process.env.TYPEORM_CONNECTION,
            host: process.env.TYPEORM_HOST,
            port: process.env.TYPEORM_PORT,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            ssl: true
        });
    }

    console.log(connectionOptions);

    return createConnection({ ...connectionOptions, name: "default" });
}