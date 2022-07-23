import { Injectable } from "@nestjs/common";
import { PlanetEntity } from "@shared/entity/planet.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PlanetRepository extends Repository<PlanetEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(PlanetEntity);
        super(target, manager, queryRunner);
    }
}
