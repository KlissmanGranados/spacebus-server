import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'aut/dto/signup.dto';
import { SigninDto } from 'aut/dto/signin.dto';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { Role } from './enums/role.enum';

@Injectable()
export class AutService {
    constructor(private readonly jwtService: JwtService) { }

    async signup(signUp: SignUpDto): Promise<void> {
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {

        const payload: IJwtPayload = {
            id: 1,
            email: "test",
            username: "test",
            role: Role.EMPRESA,
        };

        return { token: this.jwtService.sign(payload) };

    }
}
