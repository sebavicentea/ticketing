import { Publisher , Subjects, OrderCreatedEvent } from '@sebavicentea_org/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}