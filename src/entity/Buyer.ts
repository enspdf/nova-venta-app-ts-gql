import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity("tblBuyer")
@ObjectType()
export class Buyer extends BaseEntity {
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