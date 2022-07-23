import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { UserController } from './controller/user.controller';
import { AutController } from './controller/aut.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [SharedModule],
  providers: [UserService],
  controllers: [UserController, AutController]
})
export class AutModule { }
