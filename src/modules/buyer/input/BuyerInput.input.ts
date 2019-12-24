import { InputType, Field } from "type-graphql";

@InputType()
export class BuyerInput {
    @Field(type => String, { nullable: true })
    name?: string;

    @Field(type => Boolean, { nullable: true })
    active?: boolean;
}