import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'aut/decorators/current-user.decorator';
import { PreAuthorize } from 'aut/decorators/preauthorize.decorator';
import { Role } from 'aut/enums/role.enum';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { ProfileMeDto } from './dto/profile-me.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@PreAuthorize(Role.CLIENTE)
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Get('/me')
    async me(@CurrentUser() user: IJwtPayload): Promise<ProfileMeDto> {
        return this.profileService.me(user);
    }
}
