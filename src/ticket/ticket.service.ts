import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PageAndSortingDto, PaginatorDto } from '@shared/dto/paginator.dto';
import { TicketEntity } from '@shared/entity/ticket.entity';
import { PlanetRepository } from '@shared/repository/planet.repository';
import { SpacecraftCompanyRepository } from '@shared/repository/spacecraft-company.repository';
import { SpacecraftWorkerRepository } from '@shared/repository/spacecraft-worker.repository';
import { TicketRepository } from '@shared/repository/ticket.repository';
import { UserDto } from 'aut/dto/user.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {

    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly planetRepository: PlanetRepository,
        private readonly spaceCraftCompanyRepository: SpacecraftCompanyRepository,
        private readonly spaceCraftWorkerRepository: SpacecraftWorkerRepository) { }

    async create(createTicketDto: CreateTicketDto, user: UserDto) {

        const { rocketLaunche } = createTicketDto;

        const { planetFrom, planetTo, spacecraftCompany } = rocketLaunche;

        if (!(await this.planetRepository.findOneBy({ id: planetFrom.id }))) {
            throw new NotFoundException("Planet from is not found");
        }

        if (!(await this.planetRepository.findOneBy({ id: planetTo.id }))) {
            throw new NotFoundException("Planet to is not found");
        }
        const _spaceCraftCompany = await this.spaceCraftCompanyRepository
            .findOneBy({ id: spacecraftCompany.id });

        if (!_spaceCraftCompany) {
            throw new BadRequestException("spacecraft company is not found");
        }

        const idBySpaceCraftWorker = user.id + spacecraftCompany.id;

        if (!(await this.spaceCraftWorkerRepository.findOneBy({ id: idBySpaceCraftWorker }))) {
            throw new BadRequestException(`sorry, you don't work at ${_spaceCraftCompany.name}`);
        }

        rocketLaunche.available = rocketLaunche.capacity;
        rocketLaunche.sold = 0;
        createTicketDto.spacecraftCompany = spacecraftCompany;
        await this.ticketRepository.save(createTicketDto);

    }

    async findAll(pageAndSorting: PageAndSortingDto<TicketEntity>): Promise<PaginatorDto<TicketEntity>> {
        return this.ticketRepository.findAll(pageAndSorting);
    }
}
