import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { RoleEntity } from "./role.entity";

@Entity("users", DATABASE_CONFIG)
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    username: string;

    @Column({ length: 45, select: false })
    password: string;

    @Column({ length: 100, nullable: true })
    profileImage: string;

    @Column({ length: 100, unique: true })
    email: string;

    @ManyToOne(() => RoleEntity, (roleEntity) => roleEntity.id, {
        eager: true,
        nullable: false
    })
    @JoinColumn({ name: "roleId" })
    role: RoleEntity;

    @ManyToOne(() => PersonEntity, (person) => person.id, {
        eager: true,
        cascade: true,
        nullable: false
    })
    @JoinColumn({ name: "personId" })
    person: PersonEntity;
}