import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'aut/decorators/current-user.decorator';
import { SigninDto } from 'aut/dto/signin.dto';
import { SignUpDto } from 'aut/dto/signup.dto';
import { UserDto } from 'aut/dto/user.dto';
import { AutService } from 'aut/aut.service';
import { AllowUnauthorizedRequest } from './decorators/allow-unauthorized-request.decorator';

@Controller('aut')
export class AutController {
    constructor(private readonly autService: AutService) { }

    @Get('/me')
    async me(@CurrentUser() user: UserDto) {
        return user;
    }

    @AllowUnauthorizedRequest()
    @Post('/signup')
    async signup(@Body() signupDto: SignUpDto): Promise<void> {
        return this.autService.signup(signupDto);
    }

    @AllowUnauthorizedRequest()
    @Post('/signin')
    async signin(@Body() signinDto: SigninDto) {
        return this.autService.signin(signinDto);
    }
}
