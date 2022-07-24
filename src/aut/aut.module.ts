import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { AutController } from './aut.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@config/consts.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutService } from './aut.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AutGuard } from './guards/aut.guard';

@Module({
  imports: [
    SharedModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get(JWT_SECRET),
          signOptions: { expiresIn: (3600 * 24) * 7 }
        }
      }
    })
  ],

  providers: [
    JwtStrategy, AutService,
    {
      provide: APP_GUARD,
      useClass: AutGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AutController],
  exports: []
})
export class AutModule { }
