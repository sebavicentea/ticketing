import { Publisher , Subjects, PaymentCreatedEvent } from '@sebavicentea_org/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}