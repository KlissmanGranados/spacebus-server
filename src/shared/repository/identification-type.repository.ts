import { Injectable } from "@nestjs/common";
import { IdentificacionTypeEntity } from "@shared/entity/identificacion-type.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class IdentificationTypeRepository extends BaseRepository<IdentificacionTypeEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(IdentificacionTypeEntity);
        super(target, manager, queryRunner);
    }

}
