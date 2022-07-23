import { Injectable } from "@nestjs/common";
import { CountryEntity } from "@shared/entity/country.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CountryRepository extends Repository<CountryEntity>{
    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(CountryEntity);
        super(target, manager, queryRunner);
    }
}
