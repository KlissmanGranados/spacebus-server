import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("spacecraftCompanies", DATABASE_CONFIG)
export class SpacecraftCompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ length: 300, unique: true })
    logo: string;
}
