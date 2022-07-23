import { Injectable } from "@nestjs/common";
import { RocketLauncheEntity } from "@shared/entity/rocket-launche.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RocketLauncheRepository extends Repository<RocketLauncheEntity> {
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(RocketLauncheEntity);
        super(target, manager, queryRunner);
    }
}
