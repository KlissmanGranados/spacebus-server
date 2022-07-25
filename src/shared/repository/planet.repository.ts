import { Injectable } from "@nestjs/common";
import { PlanetEntity } from "@shared/entity/planet.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class PlanetRepository extends BaseRepository<PlanetEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(PlanetEntity);
        super(target, manager, queryRunner);
    }
}
