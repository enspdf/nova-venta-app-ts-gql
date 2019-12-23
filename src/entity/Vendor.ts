import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity("tblVendor")
@ObjectType()
export class Vendor {
    @Field(type => ID)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(type => String)
    @Column("varchar")
    name: string;

    @Field(type => Boolean)
    @Column("boolean", { default: false })
    active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};