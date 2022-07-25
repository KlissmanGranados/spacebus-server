import { Injectable } from "@nestjs/common";
import { UserTicketEntity } from "@shared/entity/user-ticket.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class UserTicketRepository extends BaseRepository<UserTicketEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserTicketEntity);
        super(target, manager, queryRunner);
    }
}
