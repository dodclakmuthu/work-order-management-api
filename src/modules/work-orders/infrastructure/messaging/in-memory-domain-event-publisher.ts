import { Injectable } from "@nestjs/common";
import { DomainEventPublisher } from "../../application/ports/domain-event-publisher.js";
import { WorkorderCompletedEvent } from "../../domain/events/work-order-completed.event.js";
import { WorkorderCompletedHandler } from '../../application/event-handlers/work-order-completed.handler.js'

@Injectable()
export class InMemoryDomainEventPublisher implements DomainEventPublisher{
    constructor(
        private readonly workOrderCompletedHandler: WorkorderCompletedHandler
    ){}

    async publish(events: object[]): Promise<void> {
        for (const event of events) {
            if (event instanceof WorkorderCompletedEvent) {
                await this.workOrderCompletedHandler.handle(event)
            }
        }
    }
}