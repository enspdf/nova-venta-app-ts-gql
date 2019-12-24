import { CampaignResolver } from './../modules/campaign/campaign.resolver';
import { VendorResolver } from './../modules/vendor/vendor.resolver';
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { BuyerResolver } from '../modules/buyer/buyer.resolver';

export const createSchema = () => buildSchema({
    resolvers: [
        VendorResolver,
        BuyerResolver,
        CampaignResolver
    ],
    container: Container
});