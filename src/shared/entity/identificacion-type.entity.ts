import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("identificacionType", DATABASE_CONFIG)
export class IdentificacionTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;
}
