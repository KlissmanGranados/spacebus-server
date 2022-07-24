import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
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

    @Column({ default: true })
    status: boolean;
}