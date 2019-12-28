import { User } from "../entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
    const environment = process.env.NODE_ENV || "dev";
    const accessTokenSecret = environment === "dev" ? "secret" : process.env.ACCESS_TOKEN_SECRET!;
    return sign({ userId: user.id }, accessTokenSecret, { expiresIn: "7d" });
};