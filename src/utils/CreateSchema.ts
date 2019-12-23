import { VendorResolver } from './../modules/vendor/vendor.resolver';
import { buildSchema } from "type-graphql";
import { Container } from "typedi";

export const createSchema = () => buildSchema({
    resolvers: [
        VendorResolver
    ],
    container: Container
});