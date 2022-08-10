import { Injectable } from '@nestjs/common';
import { UserBalanceRepository } from '@shared/repository/user-balance.repository';
import { UserRepository } from '@shared/repository/user.repository';
import { Role } from 'aut/enums/role.enum';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { ProfileMeDto } from './dto/profile-me.dto';

@Injectable()
export class ProfileService {

    constructor(
        private readonly userBalanceRepository: UserBalanceRepository,
        private readonly userRepository: UserRepository) { }

    async me(user: IJwtPayload): Promise<ProfileMeDto> {

        const [{ balance }, { email, role, username, person, profileImage }] = await Promise.all([
            user.hasRole(Role.CLIENTE) ?
                this.userBalanceRepository.findOneByOrFail({ user: { id: user.id } }) : { balance: null },
            this.userRepository.findOneByOrFail({ id: user.id })
        ]);

        return {
            user: { id: user.id, email, username },
            role,
            person,
            profileImage,
            balance,
        }

    }
}
