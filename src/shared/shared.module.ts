import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CountryRepository } from './repository/country.repository';
import { IdentificationTypeRepository } from './repository/identification-type.repository';
import { PersonRepository } from './repository/person.repository';
import { PlanetRepository } from './repository/planet.repository';
import { RocketLauncheRepository } from './repository/rocket-launche.repository';
import { RoleRepository } from './repository/role.repository';
import { SpacecraftCompanyRepository } from './repository/spacecraft-company.repository';
import { SpacecraftWorkerRepository } from './repository/spacecraft-worker.repository';
import { TicketRepository } from './repository/ticket.repository';
import { UserBalanceRepository } from './repository/user-balance.repository';
import { UserTicketRepository } from './repository/user-ticket.repository';
import { UserTransactionsRepository } from './repository/user-transactions.repository';
import { UserRepository } from './repository/user.repository';

const providers = [
  UserRepository,
  UserTransactionsRepository,
  UserTicketRepository,
  UserBalanceRepository,
  TicketRepository,
  SpacecraftWorkerRepository,
  SpacecraftCompanyRepository,
  RoleRepository,
  RocketLauncheRepository,
  PlanetRepository,
  PersonRepository,
  IdentificationTypeRepository,
  CountryRepository
];

@Module({
  imports: [DatabaseModule],
  providers,
  controllers: [],
  exports: providers
})
export class SharedModule { }