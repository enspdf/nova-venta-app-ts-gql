import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tblCampaign")
export class Campaign extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    name: string;

    @Column({ type: "timestamp", default: null, nullable: true })
    startDate: Date;

    @Column({ type: "timestamp", default: null, nullable: true })
    endDate: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};