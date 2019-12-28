import { CampaignResolver } from './../modules/campaign/campaign.resolver';
import { VendorResolver } from './../modules/vendor/vendor.resolver';
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { BuyerResolver } from '../modules/buyer/buyer.resolver';
import * as path from "path";
import { OrderItemResolver } from '../modules/orderItem/orderItem.resolver';
import { UserResolver } from '../modules/user/user.resolver';

export const createSchema = () => buildSchema({
    resolvers: [
        VendorResolver,
        BuyerResolver,
        CampaignResolver,
        OrderItemResolver,
        UserResolver
    ],
    container: Container,
    emitSchemaFile: path.resolve(__dirname, "snapshot/schema", "schema.gql")
});