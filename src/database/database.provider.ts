import {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_TYPE,
    DB_USER,
    PROFILE
} from '@config/consts.config';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const DatabaseProvider = [
    {
        inject: [ConfigService],
        provide: DataSource,
        useFactory: async (config: ConfigService) => {

            const type: "mysql" | "mariadb" | "postgres" = config.get(DB_TYPE);
            const port: number = config.get(DB_PORT);
            const host: string = config.get(DB_HOST);
            const username: string = config.get(DB_USER);
            const password: string = config.get(DB_PASS);
            const database: string = config.get(DB_NAME);
            const profile: string = config.get(PROFILE);

            const dataSource = new DataSource(
                {
                    type, username, password, host, database, port,
                    entities: [
                        "dist/**/*.entity.js"
                    ],
                    synchronize: true, //profile === "dev",
                    ssl: profile == "dev" ? false : { rejectUnauthorized: false }
                }
            );

            return dataSource.initialize();
        },
    },
];