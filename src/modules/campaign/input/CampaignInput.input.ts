import { InputType, Field } from "type-graphql";

@InputType()
export class CampaignInput {
    @Field(type => String)
    name: string;

    @Field(type => Date, { nullable: true })
    startDate: Date;

    @Field(type => Date, { nullable: true })
    endDate: Date;
}