import { Injectable } from "@nestjs/common";
import { TicketEntity } from "@shared/entity/ticket.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class TicketRepository extends BaseRepository<TicketEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(TicketEntity);
        super(target, manager, queryRunner);
    }
}
