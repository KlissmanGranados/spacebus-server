import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";
import { AutModule } from "./aut/aut.module";
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PublicModule } from './public/public.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SharedModule,
        AutModule,
        DatabaseModule,
        PublicModule,
    ],
    providers: [],
    controllers: []
})
export class AppModule {
}