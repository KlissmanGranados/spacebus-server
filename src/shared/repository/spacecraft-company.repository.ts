import { Injectable } from "@nestjs/common";
import { SpacecraftCompanyEntity } from "@shared/entity/spacecraft-company.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SpacecraftCompanyRepository extends Repository<SpacecraftCompanyEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(SpacecraftCompanyEntity);
        super(target, manager, queryRunner);
    }
}
