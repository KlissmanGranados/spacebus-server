import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shared/repository/user.repository';
import { CreateUserDto } from 'aut/dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository) { }

    async save(userDto: CreateUserDto): Promise<CreateUserDto> {
        return userDto;
    }
}