import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tblUser")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    name: string;

    @Column("varchar")
    email: string;

    @Column("text")
    password: string;

    @Column("boolean", { default: false })
    active: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    creationDate: Date;
};