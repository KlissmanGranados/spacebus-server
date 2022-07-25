import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PageAndSortingDto } from '@shared/dto/paginator.dto';
import { TicketEntity } from '@shared/entity/ticket.entity';
import { CurrentUser } from 'aut/decorators/current-user.decorator';
import { PreAuthorize } from 'aut/decorators/preauthorize.decorator';
import { UserDto } from 'aut/dto/user.dto';
import { Role } from 'aut/enums/role.enum';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @PreAuthorize(Role.EMPLEADO)
    @Post()
    async create(@Body() createTicketDto: CreateTicketDto, @CurrentUser() user: UserDto) {
        return this.ticketService.create(createTicketDto, user);
    }

    @Post('/query')
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Body() pageAndSorting: PageAndSortingDto<TicketEntity>) {
        return this.ticketService.findAll(pageAndSorting);
    }
}
