import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports: [SharedModule],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule { }
