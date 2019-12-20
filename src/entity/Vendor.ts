import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tblVendor")
export class Vendor extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    name: string;

    @Column("boolean", { default: false })
    active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};