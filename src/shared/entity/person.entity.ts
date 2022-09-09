import { DATABASE_CONFIG } from "@config/consts.config";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "./country.entity";
import { IdentificacionTypeEntity } from "./identificacion-type.entity";
import { PlanetEntity } from "./planet.entity";
import { UserEntity } from "./user.entity";

@Entity("persons", DATABASE_CONFIG)
export class PersonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45 })
    name: string;

    @Column({ length: 45 })
    lastName: string;

    @Column({ length: 45 })
    identificacion: string;

    @OneToMany(() => UserEntity, (userEntity) => userEntity.person, {
        lazy: true
    })
    user: UserEntity[];

    @ManyToOne(() => CountryEntity, (countryEntity => countryEntity.id), { nullable: false })
    @JoinColumn({ name: "countryId" })
    country: CountryEntity;

    @ManyToOne(() => IdentificacionTypeEntity, (identificacionTypeEntity =>
        identificacionTypeEntity.id), { nullable: false })
    @JoinColumn({ name: "identificacionTypeId" })
    identificacionType: IdentificacionTypeEntity;

    @ManyToOne(() => PlanetEntity, (planetEntity) => planetEntity.id, { nullable: false })
    @JoinColumn({ name: "favoritePlanetId" })
    favoritePlanet: PlanetEntity;
}
