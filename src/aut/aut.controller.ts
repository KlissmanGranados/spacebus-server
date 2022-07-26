import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AutService } from './aut.service';
import { AllowUnauthorizedRequest } from './decorators/allow-unauthorized-request.decorator';
import { IJwtPayload } from './jwt-payload.interface';

@Controller('aut')
export class AutController {
    constructor(private readonly autService: AutService) { }

    @Get('/me')
    async me(@CurrentUser() user: IJwtPayload) {
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
