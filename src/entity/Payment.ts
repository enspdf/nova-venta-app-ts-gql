import { ID } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Buyer } from './Buyer';
import { Campaign } from './Campaign';
import { User } from './User';
import { Vendor } from './Vendor';
import { ObjectType, Field } from 'type-graphql';

@Entity("tblPayment")
@ObjectType()
export class Payment extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(type => Campaign, { nullable: true })
    @ManyToOne(() => Campaign, campaign => campaign.id, { nullable: false })
    @JoinColumn()
    campaign: Campaign;

    @Field(type => Vendor, { nullable: true })
    @ManyToOne(() => Vendor, vendor => vendor.id, { nullable: false })
    @JoinColumn()
    vendor: Vendor;

    @Field(type => Buyer, { nullable: true })
    @ManyToOne(() => Buyer, buyer => buyer.id, { nullable: false })
    @JoinColumn()
    buyer: Buyer;

    @Field(type => User, { nullable: true })
    @ManyToOne(() => User, user => user.id, { nullable: false })
    @JoinColumn()
    user: User;

    @Field(type => String)
    @Column({ type: "date", default: null, nullable: true })
    date: Date;

    @Field(type => String)
    @Column("varchar")
    note: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};