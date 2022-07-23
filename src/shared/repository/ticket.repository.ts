import { Injectable } from "@nestjs/common";
import { TicketEntity } from "@shared/entity/ticket.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TicketRepository extends Repository<TicketEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(TicketEntity);
        super(target, manager, queryRunner);
    }
}
