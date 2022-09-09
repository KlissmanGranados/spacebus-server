import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("userTransactions", DATABASE_CONFIG)
export class UserTransactionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float", default: 0 })
    amount: number;

    @Column()
    date: Date;

    @ManyToOne(() => UserEntity, userEntity => userEntity.id, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: UserEntity;
}
