import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@shared/entity/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {

    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserEntity);
        super(target, manager, queryRunner);
    }

}

