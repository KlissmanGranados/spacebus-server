import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'aut/dto/create-user.dto';
import { UserService } from 'aut/service/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.save(userDto);
    }
}
