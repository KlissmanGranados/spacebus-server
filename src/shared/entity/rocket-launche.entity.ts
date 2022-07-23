import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpacecraftCompanyEntity } from "./spacecraft-company.entity";

@Entity("rocketLaunches")
export class RocketLauncheEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SpacecraftCompanyEntity, (spacecraftCompanyEntity) => spacecraftCompanyEntity.id)
    @JoinColumn({ name: "spacecraftCompanyId" })
    spacecraftCompany: SpacecraftCompanyEntity;
}
