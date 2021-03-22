import { Publisher , Subjects, TicketCreatedEvent } from '@sebavicentea_org/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}