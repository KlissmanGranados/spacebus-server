import { DATABASE_CONFIG } from "@config/consts.config";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { UserEntity } from "./user.entity";

@Entity("usersTickets", DATABASE_CONFIG)
export class UserTicketEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, userEntity => userEntity.id, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ManyToOne(() => TicketEntity, ticketEntity => ticketEntity.id, { nullable: false })
    @JoinColumn({ name: "ticketId" })
    ticket: TicketEntity;
}
