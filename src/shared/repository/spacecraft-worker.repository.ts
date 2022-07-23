import { Injectable } from "@nestjs/common";
import { SpacecraftWorkerEntity } from "@shared/entity/spacecraft-worker.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SpacecraftWorkerRepository extends Repository<SpacecraftWorkerEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(SpacecraftWorkerEntity);
        super(target, manager, queryRunner);
    }
}
