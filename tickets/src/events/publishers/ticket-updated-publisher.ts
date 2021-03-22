import { Publisher , Subjects, TicketUpdatedEvent } from '@sebavicentea_org/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}