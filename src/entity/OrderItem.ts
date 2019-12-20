import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Buyer } from './Buyer';
import { Campaign } from './Campaign';
import { User } from './User';
import { Vendor } from './Vendor';

@Entity("tblOrderItem")
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Campaign, campaign => campaign.id, { nullable: false })
    campaign: Campaign;

    @ManyToOne(() => Vendor, vendor => vendor.id, { nullable: false })
    vendor: Vendor;

    @ManyToOne(() => Buyer, buyer => buyer.id, { nullable: false })
    buyer: Buyer;

    @ManyToOne(() => User, user => user.id, { nullable: false })
    user: User;

    @Column("varchar")
    productDescription: string;

    @Column("varchar")
    productCode: string;

    @Column("integer")
    productPage: number;

    @Column("integer")
    quantity: number;

    @Column("decimal")
    cost: number;

    @Column("decimal")
    price: number;

    @Column("timestamp", { default: null, nullable: true })
    date: Date;

    @Column("varchar")
    note: string;

    @Column("boolean")
    receive: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};