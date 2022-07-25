import { Injectable } from "@nestjs/common";
import { RocketLauncheEntity } from "@shared/entity/rocket-launche.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class RocketLauncheRepository extends BaseRepository<RocketLauncheEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(RocketLauncheEntity);
        super(target, manager, queryRunner);
    }
}
