import { Injectable } from "@nestjs/common";
import { PersonEntity } from "@shared/entity/person.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class PersonRepository extends BaseRepository<PersonEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(PersonEntity);
        super(target, manager, queryRunner);
    }
}
