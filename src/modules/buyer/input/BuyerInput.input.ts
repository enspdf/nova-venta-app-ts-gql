import { InputType, Field } from "type-graphql";

@InputType()
export class BuyerInput {
    @Field(type => String)
    name: string;

    @Field(type => Boolean)
    active: boolean;
}