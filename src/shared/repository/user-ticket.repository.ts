import { Injectable } from "@nestjs/common";
import { UserTicketEntity } from "@shared/entity/user-ticket.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserTicketRepository extends Repository<UserTicketEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserTicketEntity);
        super(target, manager, queryRunner);
    }
}
