import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";
import { AutModule } from "aut/aut.module";
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SharedModule,
        AutModule,
        DatabaseModule
    ],
    providers: [],
    controllers: []
})
export class AppModule {
}