import { BadGatewayException, BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PageAndSortingDto, PaginatorDto } from '@shared/dto/paginator.dto';
import { TicketDto } from '@shared/dto/select-by-id.dto';
import { RocketLauncheEntity } from '@shared/entity/rocket-launche.entity';
import { SpacecraftWorkerEntity } from '@shared/entity/spacecraft-worker.entity';
import { TicketEntity } from '@shared/entity/ticket.entity';
import { UserBalanceEntity } from '@shared/entity/user-balance.entity';
import { UserTicketEntity } from '@shared/entity/user-ticket.entity';
import { PlanetRepository } from '@shared/repository/planet.repository';
import { RocketLauncheRepository } from '@shared/repository/rocket-launche.repository';
import { SpacecraftCompanyRepository } from '@shared/repository/spacecraft-company.repository';
import { SpacecraftWorkerRepository } from '@shared/repository/spacecraft-worker.repository';
import { TicketRepository } from '@shared/repository/ticket.repository';
import { UserBalanceRepository } from '@shared/repository/user-balance.repository';
import { UserTicketRepository } from '@shared/repository/user-ticket.repository';
import { Role } from 'aut/enums/role.enum';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { changeStatusOfRocketLauncheDto } from './dto/change-status-of-rocket-launche.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {

    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly planetRepository: PlanetRepository,
        private readonly spaceCraftCompanyRepository: SpacecraftCompanyRepository,
        private readonly spaceCraftWorkerRepository: SpacecraftWorkerRepository,
        private readonly rocketLauncheRepository: RocketLauncheRepository,
        private readonly userTicketRepository: UserTicketRepository,
        private readonly userBalanceRepository: UserBalanceRepository) { }

    async buyTicket(ticketDto: TicketDto, user: IJwtPayload) {

        const ticket = await this.ticketRepository.findOneBy({ id: ticketDto.id });
        if (!ticket) throw new NotFoundException("Ticket not found!");

        const userBalance = await this.userBalanceRepository.findOneBy({ user: { id: user.id } });
        if (!userBalance) throw new BadRequestException("you dont have balance");
        if (userBalance.balance - ticket.price < 0)
            throw new BadRequestException(`insufficient balance, ticket price is ${ticket.price} credits, and you have : ${userBalance.balance} credits in your wallet :/`);

        let userTicket = { ticket: { id: ticketDto.id }, user: { id: user.id } };
        if (await this.userTicketRepository.findOneBy(userTicket))
            throw new BadRequestException("you have already bought this ticket!");

        const ticketNotAvaible = ticket.rocketLaunche.available == 0 || ticket.rocketLaunche.status == false;

        if (ticketNotAvaible) {
            throw new BadRequestException("Sorry, tickets is not available :(");
        }

        const entityManager = this.ticketRepository.getEntityManager();
        const incrementOneRocketLaunche = 1;
        await entityManager.transaction(async (transactional) => {
            await Promise.all([
                transactional.getRepository(UserTicketEntity).save(userTicket),
                transactional.getRepository(RocketLauncheEntity)
                    .increment({ id: ticket.rocketLaunche.id }, "sold", incrementOneRocketLaunche),
                transactional.getRepository(RocketLauncheEntity)
                    .decrement({ id: ticket.rocketLaunche.id }, "available", incrementOneRocketLaunche),
                transactional.getRepository(UserBalanceEntity)
                    .decrement({ user: { id: user.id } }, "balance", ticket.price)
            ]);
            const rocketLaunche = await this.rocketLauncheRepository.findOneBy({ id: ticket.rocketLaunche.id });
            if (rocketLaunche.sold > rocketLaunche.capacity) throw new BadGatewayException("Sorry, try buy again");
        })
    }

    async findPurchasedTickets(user: IJwtPayload): Promise<TicketEntity[]> {
        return this.ticketRepository.createQueryBuilder("t")
            .innerJoin("usersTickets", 'ut', 't.id = ut.ticketId')
            .where("ut.userId = :userId", { userId: user.id })
            .getMany();
    }

    async create(createTicketDto: CreateTicketDto, user: IJwtPayload): Promise<void> {

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

    async findAll(pageAndSorting: PageAndSortingDto<TicketEntity>, user: IJwtPayload): Promise<PaginatorDto<TicketEntity>> {
        const { where } = pageAndSorting;

        let rocketLauncheEntity: RocketLauncheEntity;
        if (!where.rocketLaunche) where.rocketLaunche = {};
        rocketLauncheEntity = where.rocketLaunche as RocketLauncheEntity;
        where.rocketLaunche = { ...rocketLauncheEntity, status: true }

        if (user.hasRole(Role.EMPLEADO)) {
            const spaceCraftWorker: SpacecraftWorkerEntity = await this.spaceCraftWorkerRepository.findOneBy({ user: { id: user.id } });
            const spaceCraftCompanyId = spaceCraftWorker.spacecraftCompany.id
            where.rocketLaunche.spacecraftCompany = { id: spaceCraftCompanyId };
        }

        return this.ticketRepository.findAll(pageAndSorting);
    }

    async changeStatusOfRocketLaunche({ id, status }: changeStatusOfRocketLauncheDto, user: IJwtPayload): Promise<void> {
        const rocketLaunche = await this.rocketLauncheRepository.findOneBy({ id });
        if (!rocketLaunche) throw new NotFoundException("Rocket launche is not found!");
        const { spacecraftCompany } = rocketLaunche;
        const spaceWorkerCompanyId = spacecraftCompany.id + user.id;
        const companyBySpaceWorker = await this.spaceCraftCompanyRepository.findOneBy({ id: spaceWorkerCompanyId });
        if (companyBySpaceWorker.id !== spaceWorkerCompanyId)
            throw new ForbiddenException(`Sorry, you not work at : ${spacecraftCompany.name}`);
        rocketLaunche.status = status;
        await this.rocketLauncheRepository.update(id, { status });
    }

}
