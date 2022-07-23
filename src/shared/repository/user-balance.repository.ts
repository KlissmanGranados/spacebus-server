import { Injectable } from "@nestjs/common";
import { UserBalanceEntity } from "@shared/entity/user-balance.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserBalanceRepository extends Repository<UserBalanceEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserBalanceEntity);
        super(target, manager, queryRunner);
    }
}
