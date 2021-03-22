import { Publisher , Subjects, OrderCancelledEvent } from '@sebavicentea_org/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}