import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("identificacionType")
export class IdentificacionTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;
}
