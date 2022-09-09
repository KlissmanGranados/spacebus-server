import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { SpacecraftCompanyEntity } from "./spacecraft-company.entity";
import { UserEntity } from "./user.entity";

@Entity("spacecraftWorker", DATABASE_CONFIG)
export class SpacecraftWorkerEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, { nullable: false })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ManyToOne(() => SpacecraftCompanyEntity, (spacecraftCompanyEntity) =>
        spacecraftCompanyEntity.id, { nullable: false, eager: true })
    @JoinColumn({ name: "spacecraftCompanyId" })
    spacecraftCompany: SpacecraftCompanyEntity;

    @Column({ default: true })
    status: boolean;
}