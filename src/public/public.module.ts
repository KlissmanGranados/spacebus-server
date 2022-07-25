import { CacheModule, Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { PublicController } from './public.controller';

@Module({
  imports: [SharedModule, CacheModule.register({
    ttl: 3600 * 24
  })],
  controllers: [PublicController],
  providers: []
})
export class PublicModule { }
