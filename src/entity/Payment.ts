import { User } from './User';
import { Buyer } from './Buyer';
import { Vendor } from './Vendor';
import { Campaign } from './Campaign';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("tblPayment")
export class Payment extends BaseEntity {
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

    @Column({ type: "date", default: null, nullable: true })
    date: Date;

    @Column("varchar")
    note: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};