import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RocketLauncheEntity } from "./rocket-launche.entity";
import { SpacecraftCompanyEntity } from "./spacecraft-company.entity";

@Entity("tickets")
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    description: string;

    @Column({ type: "float" })
    price: number;

    @ManyToOne(() => SpacecraftCompanyEntity, spacecraftCompanyEntity => spacecraftCompanyEntity.id)
    @JoinColumn({ name: "spacecraftCompanyId" })
    spacecraftCompany: SpacecraftCompanyEntity;

    @OneToOne(type => RocketLauncheEntity, {
        eager: true
    })
    @JoinColumn({ name: "rocketLauncheId" })
    rocketLaunche: RocketLauncheEntity;
}
