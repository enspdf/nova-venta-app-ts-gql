import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions[] = [
    {
        name: "production",
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: true,
        synchronize: true,
        dropSchema: true,
        logging: false,
        entities: ["src/entity/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    },
    {
        name: "dev",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "novaVentaAppDev",
        synchronize: false,
        dropSchema: false,
        logging: false,
        entities: ["src/entity/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    },
    {
        name: "test",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "novaVentaAppTest",
        synchronize: true,
        logging: false,
        dropSchema: true,
        entities: ["src/entity/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        subscribers: ["src/subscriber/**/*.ts"],
        cli: {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }
];

export = connectionOptions;