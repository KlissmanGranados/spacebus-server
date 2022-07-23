import { Injectable } from "@nestjs/common";
import { PersonEntity } from "@shared/entity/person.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PersonRepository extends Repository<PersonEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(PersonEntity);
        super(target, manager, queryRunner);
    }
}
