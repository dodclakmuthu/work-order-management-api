import { Injectable } from "@nestjs/common";
import { WorkorderCompletedEvent } from "../../domain/events/work-order-completed.event.js";
import { NotificationPort } from "../ports/notification.port.js";

@Injectable()
export class WorkorderCompletedHandler{
    constructor(
        private readonly notification: NotificationPort,
    ){}

    async handle(event: WorkorderCompletedEvent): Promise<void>{
        await this.notification.notifyWorkOrderCompleted(event.workOrderId);
    }
}