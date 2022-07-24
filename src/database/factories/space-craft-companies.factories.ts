import { define } from "typeorm-seeding";
import * as Faker from "@faker-js/faker";

import { SpacecraftCompanyEntity } from "../../shared/entity/spacecraft-company.entity";

define(SpacecraftCompanyEntity, (faker: typeof Faker, context: { roles: string[] }) => {
    const spacecraftCompanyEntity = new SpacecraftCompanyEntity();
    spacecraftCompanyEntity.name = Faker.faker.unique(Faker.faker.company.companyName);
    spacecraftCompanyEntity.logo = Faker.faker.unique(Faker.faker.internet.avatar);
    return spacecraftCompanyEntity;
})