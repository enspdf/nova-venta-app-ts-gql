import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
    @Field(type => String)
    name: string;

    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;
}