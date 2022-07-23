import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("planets")
export class PlanetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;

    @Column({ length: 100, unique: true })
    image: string;

    @Column({ length: 100, unique: true })
    icon: string;

    @Column({ length: 45, unique: true })
    code: string;
}
