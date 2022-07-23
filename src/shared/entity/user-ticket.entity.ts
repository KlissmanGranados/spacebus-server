import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TicketEntity } from "./ticket.entity";
import { UserEntity } from "./user.entity";

@Entity("usersTickets")
export class UserTicketEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, userEntity => userEntity.id)
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ManyToOne(() => TicketEntity, ticketEntity => ticketEntity.id)
    @JoinColumn({ name: "ticketId" })
    ticket: TicketEntity;
}
