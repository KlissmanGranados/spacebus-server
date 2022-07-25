import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("userBalance")
export class UserBalanceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "float", default: 0 })
    balance: number;

    @OneToOne(type => UserEntity, { lazy: true, nullable: false })
    @JoinColumn({ name: "userId" })
    user: UserEntity;
}
