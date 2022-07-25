import { Injectable } from "@nestjs/common";
import { UserBalanceEntity } from "@shared/entity/user-balance.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class UserBalanceRepository extends BaseRepository<UserBalanceEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserBalanceEntity);
        super(target, manager, queryRunner);
    }
}
