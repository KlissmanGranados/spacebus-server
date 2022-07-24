import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'aut/dto/signup.dto';
import { SigninDto } from 'aut/dto/signin.dto';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { Role } from './enums/role.enum';
import { UserRepository } from '@shared/repository/user.repository';
import { RoleRepository } from '@shared/repository/role.repository';
import { PersonRepository } from '@shared/repository/person.repository';

@Injectable()
export class AutService {

    private static ALLOWED_ROLES = [Role.CLIENTE];

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly rolesRepository: RoleRepository,
        private readonly personRepository: PersonRepository) { }

    async signup(signUp: SignUpDto): Promise<void> {

        let user = await this.userRepository.findOneBy({ email: signUp.email });
        const role = await this.rolesRepository.findOneBy({ id: signUp.role.id });

        if (!role || !AutService.ALLOWED_ROLES.some(allowed => allowed === role.name))
            throw new BadRequestException("Rol is not valid");
        if (user) throw new BadRequestException("Email is not available");

        user = await this.userRepository.findOneBy({ username: signUp.username });
        if (user) throw new BadRequestException("UserName is not available")

        const { identificacion, identificacionType } = signUp.person;
        const person = await this.personRepository.findOneBy({ identificacion, identificacionType });

        if (person) {
            user = { ...signUp, id: 1, profileImage: null, person };
            await this.userRepository.save(user);
        } else {
            await this.userRepository.save(signUp)
        }
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {

        const user = await this.userRepository.findOneBy(signinDto);

        if (!user) {
            throw new NotFoundException("invalid credentials");
        }

        const { id, email, username, role } = user;

        const payload: IJwtPayload = { id, email, username, role: role.name as Role };

        return { token: this.jwtService.sign(payload) };

    }
}
