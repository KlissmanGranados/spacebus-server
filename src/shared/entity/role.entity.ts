import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles", DATABASE_CONFIG)
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;
}
