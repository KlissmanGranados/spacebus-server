import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as AutGuarded } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ALLOW_UNAUTHORIZED_REQUEST } from '../decorators/allow-unauthorized-request.decorator';

@Injectable()
export class AutGuard extends AutGuarded("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const notAut = this.reflector.getAllAndOverride<boolean>(ALLOW_UNAUTHORIZED_REQUEST, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (notAut) return true;
    return super.canActivate(context);
  }
}