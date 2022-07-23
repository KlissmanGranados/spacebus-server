
import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

import { CountryEntity } from "../../shared/entity/country.entity";
import { IdentificacionTypeEntity } from "../../shared/entity/identificacion-type.entity";
import { PlanetEntity } from "../../shared/entity/planet.entity";
import { RoleEntity } from "../../shared/entity/role.entity";
import { UserEntity } from "../../shared/entity/user.entity";

export class DatabaseSeed implements Seeder {

    private async executed(repository, callBack: Function) {
        if ((await repository.count()) == 0) {
            await callBack(repository);
        }
    }

    async run(factory: Factory, dataSource: DataSource): Promise<void> {
        await Promise.all([

            this.executed(dataSource.getRepository(RoleEntity), async (repository) => {
                const roles = ["empresa", "empleado", "cliente"];
                for (const role of roles) {
                    const roleEntity = new RoleEntity();
                    roleEntity.name = role;
                    await repository.save(roleEntity);
                }
            }),

            this.executed(dataSource.getRepository(CountryEntity),
                (repository) => factory(CountryEntity)().createMany(50)),

            this.executed(dataSource.getRepository(IdentificacionTypeEntity), async (repository) => {
                const types = ["documento nacional", "pasaporte"];
                for (const type of types) {
                    const identificacionType = new IdentificacionTypeEntity();
                    identificacionType.name = type;
                    await repository.save(identificacionType);
                }
            }),

            this.executed(dataSource.getRepository(PlanetEntity), async (repository) => {
                const planets = [
                    "mercurio", "venus", "tierra",
                    "marte", "júpiter", "saturno",
                    "urano", "neptuno"
                ];

                for (const planet of planets) {
                    const planetEntity = new PlanetEntity();
                    planetEntity.name = planet;
                    planetEntity.code = String(planets.indexOf(planet));
                    planetEntity.image = `${planet}.jpg`;
                    planetEntity.icon = `${planet}.jpg`;
                    await repository.save(planetEntity);
                }
            })
        ]);

        await this.executed(dataSource.getRepository(UserEntity), async (repository) => {
            const resolver = factory(UserEntity)();
            let counter = 0;
            await resolver.map(async (user) => {
                counter++;
                user.role.id = counter;
                return user;
            }).createMany(3);
        })

    }

}