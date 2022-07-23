import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PlanetEntity } from "./planet.entity";
import { SpacecraftCompanyEntity } from "./spacecraft-company.entity";
import { UserEntity } from "./user.entity";

@Entity("spacecraftWorker")
export class SpacecraftWorkerEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
    @JoinColumn({ name: "userId" })
    user: UserEntity;

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
}