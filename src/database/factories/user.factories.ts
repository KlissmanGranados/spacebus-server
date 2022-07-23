import { define } from "typeorm-seeding";
import * as Faker from "@faker-js/faker";
import * as crypto from "crypto";

import { UserEntity } from "../../shared/entity/user.entity";
import { RoleEntity } from "../../shared/entity/role.entity";
import { PersonEntity } from "../../shared/entity/person.entity";
import { CountryEntity } from "../../shared/entity/country.entity";
import { IdentificacionTypeEntity } from "../../shared/entity/identificacion-type.entity";
import { PlanetEntity } from "../../shared/entity/planet.entity";

const PASSWORD = "1234";

define(UserEntity, (faker: typeof Faker, context: { roles: string[] }) => {

    const user = new UserEntity();
    user.username = Faker.faker.unique(Faker.faker.internet.userName);
    user.username = user.username.toLowerCase();
    user.password = crypto.createHash('sha256').update(PASSWORD).digest('base64');
    user.email = Faker.faker.unique(Faker.faker.internet.email);
    user.email = user.email.toLowerCase();
    user.role = new RoleEntity();
    user.role.id = 1;

    user.profileImage = Faker.faker.unique(Faker.faker.internet.avatar);

    const person = new PersonEntity();
    const country = new CountryEntity();
    const identificacionType = new IdentificacionTypeEntity();
    const planet = new PlanetEntity();

    country.id = 1;
    identificacionType.id = 1;
    planet.id = 1;

    person.country = country;
    person.identificacionType = identificacionType;
    person.favoritePlanet = planet;

    person.identificacion = Faker.faker.unique(Faker.faker.internet.ipv4);
    person.lastName = Faker.faker.name.lastName();
    person.name = Faker.faker.name.firstName();

    user.person = person;

    return user;
})