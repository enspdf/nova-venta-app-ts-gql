import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity("tblCampaign")
@ObjectType()
export class Campaign extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(type => String)
    @Column("varchar")
    name: string;

    @Field(type => Date)
    @Column({ type: "timestamp", default: null, nullable: true })
    startDate: Date;

    @Field(type => Date)
    @Column({ type: "timestamp", default: null, nullable: true })
    endDate: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};