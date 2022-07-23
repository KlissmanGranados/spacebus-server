import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("countries")
export class CountryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 56, unique: true })
    name: string;
}
