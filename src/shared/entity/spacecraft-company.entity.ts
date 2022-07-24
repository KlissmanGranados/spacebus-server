import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("spacecraftCompanies")
export class SpacecraftCompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ length: 300, unique: true })
    logo: string;
}
