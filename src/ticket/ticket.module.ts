import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
    imports: [SharedModule],
    providers: [TicketService],
    controllers: [TicketController]
})
export class TicketModule { }
