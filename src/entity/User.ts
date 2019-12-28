import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity("tblUser")
@ObjectType()
export class User extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(type => String)
    @Column("varchar")
    name: string;

    @Field(type => String)
    @Column("varchar")
    email: string;

    @Column("text")
    password: string;

    @Field(type => Boolean)
    @Column("boolean", { default: false })
    active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};