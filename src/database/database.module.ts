import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';
const providers = [...DatabaseProvider];

@Module({
    providers,
    exports: providers
})
export class DatabaseModule {
}
