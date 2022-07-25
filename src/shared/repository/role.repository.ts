import { Injectable } from "@nestjs/common";
import { RoleEntity } from "@shared/entity/role.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(RoleEntity);
        super(target, manager, queryRunner);
    }
}
