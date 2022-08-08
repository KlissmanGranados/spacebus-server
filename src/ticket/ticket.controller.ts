import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { PageAndSortingDto, PaginatorDto } from '@shared/dto/paginator.dto';
import { TicketDto } from '@shared/dto/select-by-id.dto';
import { TicketEntity } from '@shared/entity/ticket.entity';
import { CurrentUser } from 'aut/decorators/current-user.decorator';
import { PreAuthorize } from 'aut/decorators/preauthorize.decorator';
import { Role } from 'aut/enums/role.enum';
import { IJwtPayload } from 'aut/jwt-payload.interface';
import { changeStatusOfRocketLauncheDto } from './dto/change-status-of-rocket-launche.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @PreAuthorize(Role.CLIENTE)
    @Get("/purchased-tickets")
    async findPurchasedTickets(@CurrentUser() user: IJwtPayload): Promise<TicketEntity[]> {
        return this.ticketService.findPurchasedTickets(user);
    }

    @PreAuthorize(Role.CLIENTE)
    @Post('/buy')
    async buyTicket(@Body() ticketDto: TicketDto, @CurrentUser() user: IJwtPayload): Promise<void> {
        return this.ticketService.buyTicket(ticketDto, user);
    }

    @Post('/query')
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Body() pageAndSorting: PageAndSortingDto<TicketEntity>,
        @CurrentUser() user: IJwtPayload): Promise<PaginatorDto<TicketEntity>> {
        return this.ticketService.findAll(pageAndSorting, user);
    }

    @PreAuthorize(Role.EMPLEADO)
    @Post()
    async create(@Body() createTicketDto: CreateTicketDto, @CurrentUser() user: IJwtPayload): Promise<void> {
        return this.ticketService.create(createTicketDto, user);
    }

    @Patch('/rocket-launche/disable/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @PreAuthorize(Role.EMPLEADO)
    async changeStatusOfRocketLaunche(
        @Param("id") id: number,
        @CurrentUser() user: IJwtPayload
    ): Promise<void> {
        const rocketLauncheDto = new changeStatusOfRocketLauncheDto();
        rocketLauncheDto.id = id;
        rocketLauncheDto.status = false;
        return this.ticketService.changeStatusOfRocketLaunche(rocketLauncheDto, user);
    }
}
