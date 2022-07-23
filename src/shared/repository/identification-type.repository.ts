import { Injectable } from "@nestjs/common";
import { IdentificacionTypeEntity } from "@shared/entity/identificacion-type.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class IdentificationTypeRepository extends Repository<IdentificacionTypeEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(IdentificacionTypeEntity);
        super(target, manager, queryRunner);
    }

}
