import { Injectable } from "@nestjs/common";
import { RoleEntity } from "@shared/entity/role.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(RoleEntity);
        super(target, manager, queryRunner);
    }
}
