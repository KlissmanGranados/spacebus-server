import { Injectable } from '@nestjs/common';
import { UserBalanceRepository } from '@shared/repository/user-balance.repository';
import { UserRepository } from '@shared/repository/user.repository';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { ProfileMeDto } from './dto/profile-me.dto';

@Injectable()
export class ProfileService {

    constructor(
        private readonly userBalanceRepository: UserBalanceRepository,
        private readonly userRepository: UserRepository) { }

    async me({ id }: IJwtPayload): Promise<ProfileMeDto> {

        const [{ balance }, { email, role, username, person, profileImage }] = await Promise.all([
            this.userBalanceRepository.findOneByOrFail({ user: { id } }),
            this.userRepository.findOneByOrFail({ id })
        ]);

        return {
            user: { id, balance, email, username },
            role,
            person,
            profileImage
        }

    }
}
