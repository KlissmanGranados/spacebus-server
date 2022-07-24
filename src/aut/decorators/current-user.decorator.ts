import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

export const CurrentUser = createParamDecorator(
    (data, ctx: ExecutionContext): UserDto => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    },
);