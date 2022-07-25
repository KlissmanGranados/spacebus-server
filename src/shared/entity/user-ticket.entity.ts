import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { UserEntity } from "./user.entity";

@Entity("usersTickets")
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
