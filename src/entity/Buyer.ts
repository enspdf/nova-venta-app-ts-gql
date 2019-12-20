import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

export class Buyer extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    name: string;

    @Column("boolean", { default: false })
    active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};