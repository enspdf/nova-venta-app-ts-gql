import { Field, InputType } from "type-graphql";

@InputType()
export class VendorInput {
    @Field(type => String, { nullable: true })
    name?: string;

    @Field(type => Boolean, { nullable: true })
    active?: boolean
}