import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SharedModule } from '@shared/shared.module';
import { PublicController } from './public.controller';

@Module({
  imports: [SharedModule, CacheModule.register({
    ttl: 3600 * 24
  })],
  controllers: [PublicController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ]
})
export class PublicModule { }
