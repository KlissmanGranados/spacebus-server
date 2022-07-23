import { define } from "typeorm-seeding";
import * as Faker from "@faker-js/faker";

import { CountryEntity } from "../../shared/entity/country.entity";

define(CountryEntity, (faker: typeof Faker, context: { roles: string[] }) => {
    const country = new CountryEntity();
    country.name = Faker.faker.unique(Faker.faker.address.country).toLowerCase();
    return country;
})