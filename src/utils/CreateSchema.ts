import { VendorResolver } from './../modules/vendor/vendor.resolver';
import { buildSchema } from "type-graphql";

export const createSchema = () => buildSchema({
    resolvers: [
        VendorResolver
    ]
});