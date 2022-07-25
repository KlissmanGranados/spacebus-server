import { Injectable } from "@nestjs/common";
import { SpacecraftWorkerEntity } from "@shared/entity/spacecraft-worker.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class SpacecraftWorkerRepository extends BaseRepository<SpacecraftWorkerEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(SpacecraftWorkerEntity);
        super(target, manager, queryRunner);
    }
}
