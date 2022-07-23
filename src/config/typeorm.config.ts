import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_TYPE, DB_USER } from './consts.config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {

        const type: "mysql" | "mariadb" | "postgres" = config.get(DB_TYPE);
        const port: number = config.get(DB_PORT);
        const host: string = config.get(DB_HOST);
        const username: string = config.get(DB_USER);
        const password: string = config.get(DB_PASS);
        const database: string = config.get(DB_NAME);

        return {
            type,
            host,
            port,
            username,
            database,
            password,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            cli: {
                migrationsDir: __dirname + '/../database/migrations',
            },
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            synchronize: false,
            logging: true,
        };
    },
};

export const typeOrmConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: __dirname + '/../database/migrations',
    },
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    synchronize: false,
    logging: true,
};