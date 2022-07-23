import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("spacecraftCompanies")
export class SpacecraftCompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, unique: true })
    name: string;

    @Column({ length: 45, unique: true })
    logo: string;
}
