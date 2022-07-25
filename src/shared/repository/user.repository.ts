import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from '@shared/entity/user.entity';
import { BaseRepository } from './base-repository.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {

    constructor(private readonly datasource: DataSource) {
        const { target, manager, queryRunner, } = datasource.getRepository(UserEntity);
        super(target, manager, queryRunner);
    }

}

