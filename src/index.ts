import "dotenv/config";
import "reflect-metadata";
import { createTypeOrmConnection } from "./utils/CreateTypeOrmConnection";
import * as express from "express";

(async () => {
    const app = express();

    await createTypeOrmConnection();

    await app.listen(4000);
    console.log(`Server is running on port 4000`);
})();