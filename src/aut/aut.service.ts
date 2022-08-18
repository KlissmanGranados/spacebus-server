import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'aut/dto/signup.dto';
import { SigninDto } from 'aut/dto/signin.dto';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { Role } from './enums/role.enum';
import { UserRepository } from '@shared/repository/user.repository';
import { RoleRepository } from '@shared/repository/role.repository';
import { PersonRepository } from '@shared/repository/person.repository';
import { IdentificationTypeRepository } from '@shared/repository/identification-type.repository';
import { CountryRepository } from '@shared/repository/country.repository';
import { PlanetRepository } from '@shared/repository/planet.repository';
import { UserBalanceRepository } from '@shared/repository/user-balance.repository';
import { UserBalanceEntity } from '@shared/entity/user-balance.entity';

@Injectable()
export class AutService {

    private static ALLOWED_ROLES = [Role.CLIENTE];

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly rolesRepository: RoleRepository,
        private readonly personRepository: PersonRepository,
        private readonly identificationTypeRepository: IdentificationTypeRepository,
        private readonly countryRepository: CountryRepository,
        private readonly planetRepository: PlanetRepository,
        private readonly userBalance: UserBalanceRepository) { }

    async signup(signUp: SignUpDto): Promise<void> {

        const role = await this.rolesRepository.findOneBy({ id: signUp.role.id });

        if (!role || !AutService.ALLOWED_ROLES.some(allowed => allowed === role.name))
            throw new BadRequestException("Rol is not valid");

        const { identificacion, identificacionType } = signUp.person;

        if (!(await this.identificationTypeRepository.findOneBy({ id: identificacionType.id }))) {
            throw new BadRequestException("identification type is not valid");
        }

        if (!(await this.countryRepository.findOneBy({ id: signUp.person.country.id }))) {
            throw new BadRequestException("country is not valid");
        }

        if (!(await this.planetRepository.findOneBy({ id: signUp.person.favoritePlanet.id }))) {
            throw new BadRequestException("planet is not valid");
        }

        let user = await this.userRepository.findOneBy({ email: signUp.email });
        if (user) throw new BadRequestException("Email is not available");

        user = await this.userRepository.findOneBy({ username: signUp.username });
        if (user) throw new BadRequestException("UserName is not available")

        const person = await this.personRepository.findOneBy({ identificacion, identificacionType });

        if (person) {
            user = { ...signUp, id: undefined, profileImage: null, person };
            user = await this.userRepository.save(user);
        } else {
            user = await this.userRepository.save(signUp)
        }
        const userBalanceEntity = new UserBalanceEntity();
        userBalanceEntity.user = user;
        await this.userBalance.save(userBalanceEntity)
    }

    async signin(signinDto: SigninDto): Promise<{ token: string }> {

        const user = await this.userRepository.findOneBy(signinDto);

        if (!user) {
            throw new BadRequestException("invalid credentials");
        }

        const { id, email, username, role } = user;

        const payload: IJwtPayload = { id, email, username, role: role.name as Role };

        return { token: this.jwtService.sign(payload) };

    }
}
