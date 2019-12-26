import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Buyer } from './Buyer';
import { Campaign } from './Campaign';
import { User } from './User';
import { Vendor } from './Vendor';
import { ObjectType, Field, ID, Int, Float } from 'type-graphql';

@Entity("tblOrderItem")
@ObjectType()
export class OrderItem extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(type => Campaign, { nullable: true })
    @ManyToOne(() => Campaign, campaign => campaign.id, { nullable: false })
    campaign: Campaign;

    @Field(type => Vendor, { nullable: true })
    @ManyToOne(() => Vendor, vendor => vendor.id, { nullable: false })
    vendor: Vendor;

    @Field(type => Buyer, { nullable: true })
    @ManyToOne(() => Buyer, buyer => buyer.id, { nullable: false })
    buyer: Buyer;

    @Field(type => User, { nullable: true })
    @ManyToOne(() => User, user => user.id, { nullable: true })
    user: User;

    @Field(type => String)
    @Column("varchar")
    productDescription: string;

    @Field(type => String)
    @Column("varchar")
    productCode: string;

    @Field(type => Int, { defaultValue: 0 })
    @Column("integer")
    productPage: number;

    @Field(type => Int, { defaultValue: 0 })
    @Column("integer")
    quantity: number;

    @Field(type => Float, { defaultValue: 0.0 })
    @Column("decimal")
    cost: number;

    @Field(type => Float, { defaultValue: 0.0 })
    @Column("decimal")
    price: number;

    @Field(type => Date)
    @Column("timestamp", { default: null, nullable: true })
    date: Date;

    @Field(type => String)
    @Column("varchar")
    note: string;

    @Field(type => Boolean)
    @Column("boolean")
    receive: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};