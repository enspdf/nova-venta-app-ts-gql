import { Field, InputType } from "type-graphql";

@InputType()
export class VendorInput {
    @Field(type => String)
    name: string;

    @Field(type => Boolean)
    active: boolean
}