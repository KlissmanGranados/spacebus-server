import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpacecraftCompanyEntity } from "./spacecraft-company.entity";
import { PlanetEntity } from "./planet.entity";

@Entity("rocketLaunches")
export class RocketLauncheEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SpacecraftCompanyEntity, (spacecraftCompanyEntity) => spacecraftCompanyEntity.id)
    @JoinColumn({ name: "spacecraftCompanyId" })
    spacecraftCompany: SpacecraftCompanyEntity;

    @Column()
    capacity: number;

    @Column({ default: 0 })
    sold: number;

    @Column({ default: 0 })
    available: number;

    @Column()
    launchDate: Date;

    @ManyToOne(() => PlanetEntity, planetEntity => planetEntity.id)
    @JoinColumn({ name: "planetIdFrom" })
    planetFrom: PlanetEntity;

    @ManyToOne(() => PlanetEntity, planetEntity => planetEntity.id)
    @JoinColumn({ name: "planetIdTo" })
    planetTo: PlanetEntity;

    @Column({ default: true })
    status: boolean;
}
