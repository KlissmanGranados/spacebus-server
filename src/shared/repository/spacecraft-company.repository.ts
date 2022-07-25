import { Injectable } from "@nestjs/common";
import { SpacecraftCompanyEntity } from "@shared/entity/spacecraft-company.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class SpacecraftCompanyRepository extends BaseRepository<SpacecraftCompanyEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(SpacecraftCompanyEntity);
        super(target, manager, queryRunner);
    }
}
