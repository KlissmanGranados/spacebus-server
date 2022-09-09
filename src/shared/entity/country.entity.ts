import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("countries", DATABASE_CONFIG)
export class CountryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 56, unique: true })
    name: string;
}