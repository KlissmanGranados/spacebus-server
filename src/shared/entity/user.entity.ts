import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { RoleEntity } from "./role.entity";

@Entity("users")
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
        eager: true
    })
    @JoinColumn({ name: "roleId" })
    role: RoleEntity;

    @ManyToOne(() => PersonEntity, (person) => person.id, {
        eager: true,
        cascade: true
    })
    @JoinColumn({ name: "personId" })
    person: PersonEntity;
}