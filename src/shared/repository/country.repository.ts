import { Injectable } from "@nestjs/common";
import { CountryEntity } from "@shared/entity/country.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base-repository.repository";

@Injectable()
export class CountryRepository extends BaseRepository<CountryEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(CountryEntity);
        super(target, manager, queryRunner);
    }
}
