import { Controller, Get } from '@nestjs/common';
import { CountryRepository } from '@shared/repository/country.repository';
import { IdentificationTypeRepository } from '@shared/repository/identification-type.repository';
import { PlanetRepository } from '@shared/repository/planet.repository';
import { RoleRepository } from '@shared/repository/role.repository';
import { AllowUnauthorizedRequest } from 'aut/decorators/allow-unauthorized-request.decorator';

@Controller('public')
@AllowUnauthorizedRequest()
export class PublicController {
    constructor(
        private readonly rolesRepository: RoleRepository,
        private readonly countryRepository: CountryRepository,
        private readonly identificationType: IdentificationTypeRepository,
        private readonly planetRepository: PlanetRepository) { }

    @Get("/roles")
    getRoles() {
        return this.rolesRepository.find();
    }

    @Get("/countries")
    getCountries() {
        return this.countryRepository.find();
    }

    @Get("/identification-types")
    getIdentificationTypes() {
        return this.identificationType.find();
    }

    @Get("/planets")
    getPlanets() {
        return this.planetRepository.find();
    }

}
