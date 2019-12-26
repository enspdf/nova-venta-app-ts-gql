import { InputType, Field, Int, Float } from "type-graphql";

@InputType()
export class UpdateOrderItemInput {
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
}