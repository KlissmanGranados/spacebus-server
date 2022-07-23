import { Injectable } from "@nestjs/common";
import { UserTransactionsEntity } from "@shared/entity/user-transactions.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserTransactionsRepository extends Repository<UserTransactionsEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserTransactionsEntity);
        super(target, manager, queryRunner);
    }
}