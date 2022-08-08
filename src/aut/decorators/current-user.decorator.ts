import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Role } from 'aut/enums/role.enum';
import { IJwtPayload } from 'aut/jwt-payload.interface';

function hasRole(role: Role): boolean {
    return this.role.toUpperCase() == role.toUpperCase();
}

export const CurrentUser = createParamDecorator(
    (data, ctx: ExecutionContext): IJwtPayload => {
        const request = ctx.switchToHttp().getRequest();
        const user: IJwtPayload = request.user;
        if (!user) {
            throw new UnauthorizedException();
        }
        user.hasRole = hasRole;
        return user;
    },
);