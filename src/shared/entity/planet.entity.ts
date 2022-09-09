import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("planets", DATABASE_CONFIG)
export class PlanetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;

    @Column({ length: 300, unique: true })
    image: string;

    @Column({ length: 100, unique: true })
    icon: string;

    @Column({ length: 45, unique: true })
    code: string;
}
