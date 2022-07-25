import { Injectable } from "@nestjs/common";
import { UserTransactionsEntity } from "@shared/entity/user-transactions.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class UserTransactionsRepository extends BaseRepository<UserTransactionsEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserTransactionsEntity);
        super(target, manager, queryRunner);
    }
}