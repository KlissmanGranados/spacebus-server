import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RocketLauncheEntity } from "./rocket-launche.entity";
import { SpacecraftCompanyEntity } from "./spacecraft-company.entity";

@Entity("tickets", DATABASE_CONFIG)
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    description: string;

    @Column({ type: "float" })
    price: number;

    @ManyToOne(() => SpacecraftCompanyEntity, spacecraftCompanyEntity => spacecraftCompanyEntity.id, { nullable: false })
    @JoinColumn({ name: "spacecraftCompanyId" })
    spacecraftCompany: SpacecraftCompanyEntity;

    @OneToOne(type => RocketLauncheEntity, {
        eager: true,
        cascade: true,
        nullable: false
    })
    @JoinColumn({ name: "rocketLauncheId" })
    rocketLaunche: RocketLauncheEntity;
}