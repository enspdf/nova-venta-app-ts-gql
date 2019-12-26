import { InputType, Field, Int, Float } from "type-graphql";

@InputType()
export class OrderItemInput {
    @Field(type => String)
    productDescription: string;

    @Field(type => String)
    productCode: string;

    @Field(type => Int)
    productPage: number;

    @Field(type => Int)
    quantity: number;

    @Field(type => Float)
    cost: number;

    @Field(type => Float)
    price: number;

    @Field(type => Date)
    date: Date;

    @Field(type => String)
    note: string;

    @Field(type => Boolean)
    receive: boolean;

    @Field(type => Int)
    campaignId: number;

    @Field(type => Int)
    vendorId: number;

    @Field(type => Int)
    buyerId: number;

    @Field(type => Int)
    userId: number;
}