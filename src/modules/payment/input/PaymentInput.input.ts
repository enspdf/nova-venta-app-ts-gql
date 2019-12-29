import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PaymentInput {
    @Field(type => Date)
    date: Date;

    @Field(type => String)
    note: string;

    @Field(type => Int)
    campaignId: number;

    @Field(type => Int)
    vendorId: number;

    @Field(type => Int)
    buyerId: number;

    @Field(type => Int)
    userId: number;
}