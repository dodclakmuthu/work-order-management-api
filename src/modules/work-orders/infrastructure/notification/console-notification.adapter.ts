import { Injectable } from "@nestjs/common";
import { NotificationPort } from "../../application/ports/notification.port.js";

@Injectable()
export class ConsoleNotificationAdapter implements NotificationPort{
    async notifyWorkOrderCompleted(workOrderId: string) : Promise<void> {
        console.log(`Notification sent: Work order ${workOrderId} completed`);
    }
}