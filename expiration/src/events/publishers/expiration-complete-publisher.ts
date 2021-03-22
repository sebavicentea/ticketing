import { Publisher , Subjects, ExpirationCompleteEvent } from '@sebavicentea_org/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}